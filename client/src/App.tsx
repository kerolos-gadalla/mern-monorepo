import '@/App.styles.css';
// import Gateways from './pages/GatewaysPage';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Link,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const gatewaysRootURI = '/api/gateways/';

const ListGateways = () => {
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

// eslint-disable-next-line max-lines-per-function
const GatewayDetails = () => {
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

// eslint-disable-next-line max-lines-per-function
const AddGateway = () => {
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

// eslint-disable-next-line max-lines-per-function
const AddPrepheral = ({
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

const App = (): JSX.Element => {
  return (
    <div className="app">
      <h1>Hello from React</h1>
      {/* <Gateways /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/gateways" />} />
          <Route path="/gateways" element={<ListGateways />} />
          <Route path="/gateways/create" element={<AddGateway />} />
          <Route path="/gateways/details/:id" element={<GatewayDetails />} />
          {/* <Route path="/gateways/edit/:id" element={EditGateway} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
