import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line max-lines-per-function
const Gateways = () => {
  const [gateways, setGateways] = useState([]);
  const [selectedGateway, setSelectedGateway] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    axios
      .get('/api/gateways/')
      .then(response => {
        setGateways(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleListItemClick = gateway => {
    setSelectedGateway(gateway);
  };

  const handleUpdate = e => {
    e.preventDefault();
    const formData = {
      serialNumber: e.target.serialNumber.value,
      name: e.target.name.value,
      ipv4Address: e.target.ipv4Address.value,
      devices: e.target.devices.value,
    };
    async function updateGateway() {
      const response = await axios.patch(
        `/api/gateways/${selectedGateway._id}`,
        formData,
      );
      const updatedGateway = response.data;
      const updatedGateways = gateways.map(gateway =>
        gateway._id === updatedGateway._id ? updatedGateway : gateway,
      );
      setGateways(updatedGateways);
      setSelectedGateway(updatedGateway);
    }
    updateGateway();
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ul>
            {gateways.map(gateway => (
              <li
                key={gateway._id}
                onClick={() => handleListItemClick(gateway)}
              >
                {gateway.name}
              </li>
            ))}
          </ul>
          <h2>Selected Gateway</h2>
          <form onSubmit={handleUpdate}>
            <label>
              Serial Number:
              <input
                type="text"
                name="serialNumber"
                defaultValue={selectedGateway.serialNumber}
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                name="name"
                defaultValue={selectedGateway.name}
              />
            </label>
            <label>
              IPV4 Address:
              <input
                type="text"
                name="ipv4Address"
                defaultValue={selectedGateway.ipv4Address}
              />
            </label>
            <label>
              Devices:
              <input
                type="text"
                name="devices"
                defaultValue={selectedGateway.devices}
              />
            </label>
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Gateways;
