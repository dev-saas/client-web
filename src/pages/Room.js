import React from 'react';
import { RelayButton } from '../components';
const Room = props => {
  return (
    <React.Fragment>
      <RelayButton pino="1" />
      <RelayButton pino="2" />
    </React.Fragment>
  );
};

export default Room;
