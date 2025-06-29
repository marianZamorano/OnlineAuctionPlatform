import { Box, Typography } from '@mui/material';
import AdminGuard from '../components/AdminGuard';

const AdminPanel = () => {
  return (
    <AdminGuard>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Panel de Administración
        </Typography>
        <Typography>
          Bienvenido al panel de administración. Aquí puedes gestionar productos y usuarios.
        </Typography>
      </Box>
    </AdminGuard>
  );
};

export default AdminPanel;