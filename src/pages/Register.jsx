import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, Avatar, Box, Typography, Snackbar, Alert } from '@mui/material';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .required('El nombre de usuario es obligatorio'),
  role: Yup.string()
    .oneOf(['user', 'admin'], 'Selecciona un rol válido')
    .required('El rol es obligatorio'),
  avatar: Yup.string()
    .url('Debe ser una URL válida')
    .nullable(),
});

const Register = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:3000/usuarios', {
        username: values.username,
        avatar: values.avatar || 'https://i.pravatar.cc/150?img=3',
        role: values.role,
      });
      login(response.data);
      setOpenSnackbar(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError('Error al registrar el usuario');
      setOpenSnackbar(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Registro
      </Typography>
      <Formik
        initialValues={{ username: '', avatar: '', role: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="username"
              label="Nombre de usuario"
              fullWidth
              margin="normal"
              error={touched.username && !!errors.username}
              helperText={touched.username && errors.username}
            />
            <Field
              as={TextField}
              name="avatar"
              label="URL del Avatar (opcional)"
              fullWidth
              margin="normal"
              error={touched.avatar && !!errors.avatar}
              helperText={touched.avatar && errors.avatar}
            />
            <Field
              as={TextField}
              name="role"
              select
              label="Rol"
              fullWidth
              margin="normal"
              error={touched.role && !!errors.role}
              helperText={touched.role && errors.role}
            >
              <MenuItem value="user">Usuario</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Field>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              Registrar
            </Button>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity={error ? 'error' : 'success'}
          onClose={() => setOpenSnackbar(false)}
        >
          {error || 'Usuario registrado con éxito'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;