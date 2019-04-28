import React, { useContext } from 'react';
import { BatContext } from '../../context';

const Temperature = props => {
  const { light } = useContext(BatContext);

  return <React.Fragment>{light} / 1024</React.Fragment>;
};

export default Temperature;
