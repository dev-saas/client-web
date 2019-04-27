import React, { useEffect, useContext, useState } from 'react';
import { RelayButton, Temperature } from '../components';
import { GraphQLContext, NotificationContext } from '../context';

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
        if (relay === 2) setRelay2IsOn(true);
      },
      error(value) {
        sendError(value);
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
        if (relay === 2) setRelay2IsOn(false);
      },
      error(value) {
        sendError(value);
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
    query({ query: `query { status }` });
  }, []);

  return (
    <React.Fragment>
      <RelayButton pino="1" active={relay1IsOn} />
      <RelayButton pino="2" active={relay2IsOn} />
      <Temperature />
    </React.Fragment>
  );
};

export default Room;
