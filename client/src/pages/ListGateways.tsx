import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { gatewaysRootURI } from '../App';

export const ListGateways = () => {
  const [gateways, setGateways] = useState<any[]>([]);
  const [_isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(gatewaysRootURI)
      .then(response => {
        setGateways(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Link to="/gateways/create">Create a new Gateway</Link>
      {gateways
        ? gateways.map(item => (
            <div key={item._id}>
              <pre>{JSON.stringify(item, null, 2)}</pre>
              <Link to={`/gateways/details/${item._id}`}>DETAILS</Link>
            </div>
          ))
        : 'No gateways yet'}
    </>
  );
};
