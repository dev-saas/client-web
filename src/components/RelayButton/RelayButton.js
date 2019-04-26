import React, { useContext, useEffect, useState } from 'react';
import { GraphQLContext, NotificationContext } from '../../context';
import './RelayButton.css';

const RelayButton = ({ pino }) => {
  const { subscribe, mutate } = useContext(GraphQLContext);
  const { sendError } = useContext(NotificationContext);
  const [isOn, setIsOn] = useState();

  let turnedOnSubscription = subscribe({
    subscription: `
      subscription {
        turnedOn
      }
    `,
    callback: {
      next({ data }) {
        const relay = data.turnedOn;
        if (relay === pino) setIsOn(true);
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
        if (relay === pino) setIsOn(false);
      },
      error(value) {
        sendError(value);
      }
    }
  });

  useEffect(() => {
    pino = +pino;
    return () => {
      turnedOnSubscription.unsubscribe();
      turnedOffSubscription.unsubscribe();
    };
  }, []);

  const handleClick = () => {
    let pinoInt = +pino;

    let mutationOn = `mutation ($pino: Int!) {
        turnOn(relay: $pino)
    }`;
    let mutationOff = `mutation ($pino: Int!) {
        turnOff(relay: $pino)
    }`;

    mutate({
      mutation: isOn ? mutationOff : mutationOn,
      variables: { pino: pinoInt }
    });
  };

  return (
    <React.Fragment>
      {pino} = {isOn ? 'on' : 'off'}
      <div onClick={handleClick} className={`cube-switch ${isOn && 'active'}`}>
        <span className="switch">
          <span className="switch-state off">Off</span>
          <span className="switch-state on">On</span>
        </span>
      </div>
    </React.Fragment>
  );
};

export default RelayButton;
