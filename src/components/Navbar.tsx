import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Subastas</Typography>
        <TextField label="Buscar" variant="outlined" size="small" sx={{ mr: 2, backgroundColor: 'white' }} />
        <Button color="inherit" onClick={() => navigate('/history')}>Historial</Button>
        {user?.rol === 'admin' && (
          <Button color="inherit" onClick={() => navigate('/users')}>Usuarios</Button>
        )}
        <Typography sx={{ mr: 1 }}>Bienvenid@ {user?.nombreDeUsuario}</Typography>
        <Button onClick={handleMenuOpen}>
          <ArrowDropDownIcon />
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};