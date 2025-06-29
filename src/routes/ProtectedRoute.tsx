import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(UserContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;