import { useContext, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box, Typography, Snackbar, Link } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { loginUser } from '../services/userService';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState<string | null>(null);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const user = await loginUser(values.username, values.password);
            setUser(user);
            setOpenSnackbar('Login successful!');
            setTimeout(() => navigate(user.role === 'admin' ? '/admin' : '/'), 2000);
          } catch (error: any) {
            setOpenSnackbar(error.message || 'Failed to login');
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="username"
              label="Username"
              fullWidth
              margin="normal"
              error={touched.username && !!errors.username}
              helperText={touched.username && errors.username}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              Ingresar
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link component={RouterLink} to="/register">
                No tengo cuenta
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={!!openSnackbar}
        autoHideDuration={3000}
        message={openSnackbar}
        onClose={() => setOpenSnackbar(null)}
      />
    </Box>
  );
};

export default Login;