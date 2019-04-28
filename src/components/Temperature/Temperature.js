import React, { useContext } from 'react';
import { BatContext } from '../../context';

const Temperature = props => {
  const { temperature, humidity } = useContext(BatContext);
  return (
    <React.Fragment>
      {temperature && temperature + 'oC'} | {humidity && humidity + '%'}
    </React.Fragment>
  );
};

export default Temperature;
