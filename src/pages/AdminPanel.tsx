import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { UserContext } from '../context/UserContext';

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
    </Box>
  );
};

export default AdminPanel;