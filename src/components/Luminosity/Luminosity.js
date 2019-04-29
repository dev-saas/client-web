import React, { useContext } from 'react';
import { BatContext } from '../../context';
import Thermometer from 'react-thermometer-component';

const Temperature = props => {
  const { light } = useContext(BatContext);
  return (
    <React.Fragment>
      Light
      <Thermometer
        theme="light"
        value={light}
        max="1"
        steps="10"
        size="medium"
        height="400"
      />
    </React.Fragment>
  );
};

export default Temperature;
