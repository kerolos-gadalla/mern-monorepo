import axios from 'axios';
import { useState } from 'react';
import { gatewaysRootURI } from '../App';

// eslint-disable-next-line max-lines-per-function

export const AddPrepheral = ({
  gatewayId,
  success,
}: {
  gatewayId: string;
  success: () => void;
}) => {
  const [formData, setFormData] = useState({
    vendor: '',
    status: 'offline',
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Create a new gateway
    axios
      .post(`${gatewaysRootURI}${gatewayId}/devices`, formData)
      .then(_res => {
        alert('Prepheral added successfully!');
        success();
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
      <label htmlFor="vendor">Vendor</label>
      <input
        type="text"
        name="vendor"
        value={formData.vendor}
        onChange={handleChange}
      />
      <label htmlFor="vendor">Vendor</label>
      <select name="vensor" value={formData.status} onChange={handleChange}>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>

      <button type="submit">Add Prepheral</button>
    </form>
  );
};
