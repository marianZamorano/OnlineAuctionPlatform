import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Box, Typography, Snackbar } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { registerUser, getUsers } from '../services/userService';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required')
    .test('unique-username', 'Username already exists', async (value) => {
      const users = await getUsers();
      return !users.some((user) => user.username === value);
    }),
  role: Yup.string()
    .oneOf(['user', 'admin'] as const, 'Invalid role')
    .required('Role is required'),
  avatar: Yup.string().url('Invalid URL').optional(),
});

const Register: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Formik
        initialValues={{ username: '', role: 'user' as 'user' | 'admin', avatar: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const newUser = await registerUser(values);
            setUser(newUser);
            setOpenSnackbar(true);
            setTimeout(() => navigate(newUser.role === 'admin' ? '/admin' : '/'), 2000);
          } catch (error) {
            console.error('Registration failed:', error);
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Field as={Select} name="role" label="Role">
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Field>
            </FormControl>
            <Field
              as={TextField}
              name="avatar"
              label="Avatar URL (optional)"
              fullWidth
              margin="normal"
              error={touched.avatar && !!errors.avatar}
              helperText={touched.avatar && errors.avatar}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} sx={{ mt: 2 }}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        message="Registration successful!"
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default Register;