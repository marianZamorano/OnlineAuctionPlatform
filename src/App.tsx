import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppRoutes from './routes/routes';
import { Box } from '@mui/material';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
          <AppRoutes />
        </Box>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;