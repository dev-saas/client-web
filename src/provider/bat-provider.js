import React, { useContext, useState, useEffect } from 'react';

import { GraphQLContext, BatContext, NotificationContext } from '../context';

const BatProvider = props => {
  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [light, setLight] = useState();

  const { subscribe } = useContext(GraphQLContext);
  const { sendError } = useContext(NotificationContext);

  let newValueSubscription = subscribe({
    subscription: `
      subscription {
        newValue {
          name
          value
        }
      }
    `,
    callback: {
      next({ data }) {
        const { newValue } = data;
        switch (newValue.name) {
          case 'luminosidade':
            setLight(newValue.value);
            break;
          case 'umidade':
            setHumidity(newValue.value);
            break;
          case 'temperatura':
            setTemperature(newValue.value);
            break;
          default:
            break;
        }
      },
      error(err) {
        sendError(err.message);
      }
    }
  });

  useEffect(() => {
    return () => {
      newValueSubscription.unsubscribe();
    };
  }, []);

  return (
    <BatContext.Provider value={{ temperature, humidity, light }}>
      {props.children}
    </BatContext.Provider>
  );
};

export default BatProvider;
