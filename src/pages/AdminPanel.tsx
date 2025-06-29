import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Typography, Box } from '@mui/material';

const AdminPanel: React.FC = () => {
  const { user } = useContext(UserContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Typography>Welcome, {user.username}! This is the admin panel.</Typography>
      {/* Implementar CRUD de productos y usuarios aquí (US4 y US5) */}
    </Box>
  );
};

export default AdminPanel;