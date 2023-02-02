import '@/App.styles.css';
// import Gateways from './pages/GatewaysPage';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import { ListGateways } from './pages/ListGateways';
import { GatewayDetails } from './pages/GatewayDetails';
import { AddGateway } from './pages/AddGateway';

export const gatewaysRootURI = '/api/gateways/';

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
