import React, { useEffect, useContext } from 'react';
import { RelayButton } from '../components';
import { GraphQLContext } from '../context';

const Room = props => {
  const { query } = useContext(GraphQLContext);
  useEffect(() => {
    query({ query: `query { status }` });
  }, []);
  return (
    <React.Fragment>
      <RelayButton pino="1" />
      <RelayButton pino="2" />
    </React.Fragment>
  );
};

export default Room;
