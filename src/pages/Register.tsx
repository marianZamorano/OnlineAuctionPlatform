import { useContext, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Box, Typography, Snackbar, Avatar, IconButton, Link } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
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
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  role: Yup.string()
    .oneOf(['user', 'admin'] as const, 'Invalid role')
    .required('Role is required'),
});

const Register: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setFieldValue('avatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Formik
        initialValues={{ username: '', password: '', confirmPassword: '', role: 'user' as 'user' | 'admin', avatar: null }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const newUser = await registerUser({
              username: values.username,
              password: values.password,
              role: values.role,
              avatar: values.avatar,
            });
            setUser(newUser);
            setOpenSnackbar('Registration successful! Please login.');
            setTimeout(() => navigate('/login'), 2000);
          } catch (error) {
            setOpenSnackbar('Registration failed');
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
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
            <Field
              as={TextField}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              error={touched.confirmPassword && !!errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Field as={Select} name="role" label="Role">
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Field>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Avatar src={avatarPreview || 'https://via.placeholder.com/50'} sx={{ width: 50, height: 50, mr: 2 }} />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={(event) => handleFileChange(event, setFieldValue)}
              />
              <label htmlFor="avatar-upload">
                <IconButton component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Register
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link component={RouterLink} to="/login">
                Ya tengo una cuenta
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

export default Register;