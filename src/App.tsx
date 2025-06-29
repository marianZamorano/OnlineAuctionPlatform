import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import { Box } from '@mui/material';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
          <Routes>
            <Route path="/" element={<div>Bienvenido a la Plataforma de Subastas</div>} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;