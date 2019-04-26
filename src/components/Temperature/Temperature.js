import React, { useContext, useEffect, useState } from 'react';
import { GraphQLContext, NotificationContext } from '../../context';

const Temperature = props => {
  const { subscribe } = useContext(GraphQLContext);
  const { sendError } = useContext(NotificationContext);
  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();

  let temperatureSubscription = subscribe({
    subscription: `
      subscription {
        newTemperature
      }
    `,
    callback: {
      next({ data }) {
        const { newTemperature } = data;
        setTemperature(newTemperature);
      },
      error(value) {
        sendError(value);
      }
    }
  });

  let humiditySubscription = subscribe({
    subscription: `
      subscription {
        newHumidity
      }
    `,
    callback: {
      next({ data }) {
        const { newHumidity } = data;
        setHumidity(newHumidity);
      },
      error(value) {
        sendError(value);
      }
    }
  });

  useEffect(() => {
    return () => {
      temperatureSubscription.unsubscribe();
      humiditySubscription.unsubscribe();
    };
  }, []);

  return (
    <React.Fragment>
      {temperature && temperature + 'oC'} | {humidity && humidity + '%'}
    </React.Fragment>
  );
};

export default Temperature;
