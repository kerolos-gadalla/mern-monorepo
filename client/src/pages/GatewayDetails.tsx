import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { gatewaysRootURI } from '../App';
import { AddPrepheral } from './AddPrepheral';

// eslint-disable-next-line max-lines-per-function
export const GatewayDetails = () => {
  const [gateway, setGateway] = useState<any>();
  const [_isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const reload = () => {
    axios
      .get(gatewaysRootURI + id)
      .then(response => {
        setGateway(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    reload();
  }, []);

  const removePrepheral = (device: any) => {
    axios
      .delete(`${gatewaysRootURI}${id}/devices/${device.uid}`)
      .then(response => {
        setGateway(response.data);
        reload();
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <>
      <Link to="/gateways/create">Create a new Gateway</Link>
      {gateway ? (
        <div>
          <pre>{JSON.stringify(gateway, null, 2)}</pre>
          <h1>Prepherals</h1>
          <div>
            {(gateway.devices || []).map((device: any) => {
              return (
                <>
                  <pre>{JSON.stringify(device, null, 2)}</pre>
                  <button onClick={() => removePrepheral(device)}>
                    Remove
                  </button>
                </>
              );
            })}
          </div>
          <AddPrepheral gatewayId={id as string} success={reload} />
        </div>
      ) : (
        'No gateways yet'
      )}
    </>
  );
};
