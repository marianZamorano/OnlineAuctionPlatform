import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  if (!user || user.rol !== 'admin') {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};