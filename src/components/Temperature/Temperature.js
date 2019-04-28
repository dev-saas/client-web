import React, { useContext } from 'react';
import { BatContext } from '../../context';
import Thermometer from 'react-thermometer-component';

const Temperature = props => {
  const { temperature, humidity } = useContext(BatContext);

  return (
    <React.Fragment>
      <Thermometer
        theme="light"
        value={temperature}
        max="45"
        steps="1"
        format="°C"
        size="large"
        height="200"
      />
      <br />
      <Thermometer
        theme="light"
        value={humidity}
        max="100"
        steps="1"
        format="%"
        size="large"
        height="200"
      />
    </React.Fragment>
  );
};

export default Temperature;
