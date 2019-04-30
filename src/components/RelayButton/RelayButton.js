import React, { useContext } from 'react';
import { GraphQLContext, NotificationContext, BatContext } from '../../context';
import './RelayButton.css';

const RelayButton = ({ pino }) => {
  const { mutate } = useContext(GraphQLContext);
  const { sendError } = useContext(NotificationContext);

  const { relay1, relay2 } = useContext(BatContext);
  const active = pino === 1 ? relay1 : relay2;

  const handleClick = async () => {
    let pinoInt = +pino;

    let mutationOn = `mutation ($pino: Int!) {
        turnOn(relay: $pino)
    }`;
    let mutationOff = `mutation ($pino: Int!) {
        turnOff(relay: $pino)
    }`;

    try {
      await mutate({
        mutation: active ? mutationOff : mutationOn,
        variables: { pino: pinoInt }
      });
    } catch (err) {
      sendError(err);
    }
  };

  return (
    <React.Fragment>
      {pino} = {active ? 'on' : 'off'}
      <div
        onClick={handleClick}
        className={`cube-switch ${active && 'active'}`}
      >
        <span className="switch">
          <span className="switch-state off">Off</span>
          <span className="switch-state on">On</span>
        </span>
      </div>
    </React.Fragment>
  );
};

export default RelayButton;
