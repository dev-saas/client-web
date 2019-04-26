import React, { useContext, useEffect, useState } from 'react';
import { GraphQLContext, NotificationContext } from '../../context';
import './RelayButton.css';

const RelayButton = ({ pino }) => {
  const { subscribe, mutate } = useContext(GraphQLContext);
  const { sendError } = useContext(NotificationContext);
  const [isOn, setIsOn] = useState();

  let relaySubscription = subscribe({
    subscription: `
      subscription {
        isOn: relay${pino}
      }
    `,
    callback: {
      next({ data }) {
        setIsOn(data.isOn);
      },
      error(value) {
        sendError(value);
      }
    }
  });

  useEffect(() => {
    pino = +pino;
    return () => {
      relaySubscription.unsubscribe();
    };
  }, []);

  const handleClick = () => {
    let pinoInt = +pino;
    setIsOn(!isOn);

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
