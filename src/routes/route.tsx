import { Routes, Route } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';
import Register from '../pages/Register';
import AdminPanel from '../pages/AdminPanel';
import Home from '../pages/Home';
import AuctionRoom from '../pages/AuctionRoom';

const AppRoutes: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/auction/:productId" element={<AuctionRoom />} />
      </Routes>
    </UserProvider>
  );
};

export default AppRoutes;