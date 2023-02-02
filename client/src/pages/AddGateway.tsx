import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { gatewaysRootURI } from '../App';

// eslint-disable-next-line max-lines-per-function
export const AddGateway = () => {
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    ipv4Address: '',
  });
  const navTo = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Create a new gateway
    axios
      .post(gatewaysRootURI, formData)
      .then(_res => {
        alert('Gateway added successfully!');
        navTo('/gateways');
      })
      .catch(error => {
        console.log(error);
        alert(
          error?.response?.data?.message ||
            error?.response?.data ||
            error.message,
        );
      });
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="serialNumber">Serial Number</label>
      <input
        type="text"
        name="serialNumber"
        value={formData.serialNumber}
        onChange={handleChange}
      />
      <label htmlFor="ipv4Address">IPv4 Address</label>
      <input
        type="text"
        name="ipv4Address"
        value={formData.ipv4Address}
        onChange={handleChange}
      />
      <button type="submit">Add Gateway</button>
    </form>
  );
};
