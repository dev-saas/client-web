import React, { useContext, useState, useEffect } from 'react';

import { GraphQLContext, BatContext, NotificationContext } from '../context';

const BatProvider = props => {
  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [light, setLight] = useState();
  const [moisture, setMoisture] = useState();
  const [relay1, setRelay1] = useState();
  const [relay2, setRelay2] = useState();

  const { subscribe, query } = useContext(GraphQLContext);
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
          case 'light':
            setLight(newValue.value);
            break;
          case 'humidity':
            setHumidity(newValue.value);
            break;
          case 'temperature':
            setTemperature(newValue.value);
            break;
          case 'moisture':
            setMoisture(newValue.value);
            break;
          case 'relay1':
            setRelay1(newValue.value);
            break;
          case 'relay2':
            setRelay2(newValue.value);
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
    query({ query: `query { status }`, fetchPolicy: 'no-cache' });
    return () => {
      newValueSubscription.unsubscribe();
    };
  }, []);

  return (
    <BatContext.Provider
      value={{ temperature, humidity, light, moisture, relay1, relay2 }}
    >
      {props.children}
    </BatContext.Provider>
  );
};

export default BatProvider;
