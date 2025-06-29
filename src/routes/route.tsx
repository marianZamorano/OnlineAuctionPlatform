import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserProvider, UserContext } from '../context/UserContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminPanel from '../pages/AdminPanel';
import Home from '../pages/Home';
import AuctionRoom from '../pages/AuctionRoom';
import AdminGuard from '../guards/AdminGuard';

const AppRoutes: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace /> : <Register />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/admin" element={<AdminGuard><AdminPanel /></AdminGuard>} />
        <Route path="/auction/:productId" element={user ? <AuctionRoom /> : <Navigate to="/login" replace />} />
      </Routes>
    </UserProvider>
  );
};

export default AppRoutes;