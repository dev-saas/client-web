import React, { useContext } from 'react';
import { BatContext } from '../../context';
import Thermometer from 'react-thermometer-component';

const Temperature = props => {
  const { light } = useContext(BatContext);
  return (
    <React.Fragment>
      <Thermometer
        theme={light > 0.5 ? 'light' : 'dark'}
        value={light}
        max="1"
        steps="0.1"
        size="medium"
        height="400"
      />
    </React.Fragment>
  );
};

export default Temperature;
