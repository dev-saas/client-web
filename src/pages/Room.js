import React, { useEffect, useContext, useState } from 'react';
import { RelayButton, Temperature, Luminosity } from '../components';
import { GraphQLContext, NotificationContext } from '../context';
import { BatProvider } from '../provider';

const Room = props => {
  const { subscribe, query } = useContext(GraphQLContext);
  const { sendError } = useContext(NotificationContext);
  const [relay1IsOn, setRelay1IsOn] = useState();
  const [relay2IsOn, setRelay2IsOn] = useState();

  let turnedOnSubscription = subscribe({
    subscription: `
      subscription {
        turnedOn
      }
    `,
    callback: {
      next({ data }) {
        const relay = data.turnedOn;
        if (relay === 1) setRelay1IsOn(true);
        else if (relay === 2) setRelay2IsOn(true);
      },
      error(value) {
        sendError(value.message);
      }
    }
  });

  let turnedOffSubscription = subscribe({
    subscription: `
      subscription {
        turnedOff
      }
    `,
    callback: {
      next({ data }) {
        const relay = data.turnedOff;
        if (relay === 1) setRelay1IsOn(false);
        else if (relay === 2) setRelay2IsOn(false);
      },
      error(value) {
        sendError(value.message);
      }
    }
  });

  useEffect(() => {
    return () => {
      turnedOnSubscription.unsubscribe();
      turnedOffSubscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    query({ query: `query { status }`, fetchPolicy: 'no-cache' });
  }, []);

  return (
    <BatProvider>
      <RelayButton pino="1" active={relay1IsOn} />
      <RelayButton pino="2" active={relay2IsOn} />
      <Temperature />
      <br />
      <Luminosity />
    </BatProvider>
  );
};

export default Room;
