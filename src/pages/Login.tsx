import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { validateUserLogin } from '../services/userService';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Avatar, Button, TextField, FormControlLabel, Switch, Typography, Box } from '@mui/material';
import { useSnackbar } from 'notistack';

interface LoginValues {
  username: string;
  isAdmin: boolean;
}

export const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [avatar, setAvatar] = useState<string | null>(null);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
  });

  const handleSubmit = async (values: LoginValues) => {
    const user = await validateUserLogin(values.username, values.isAdmin ? 'admin' : 'user');
    if (user) {
      setUser({ ...user, avatar: avatar || user.avatar });
      navigate(user.rol === 'admin' ? '/admin' : '/');
    } else {
      enqueueSnackbar('Invalid username or role', { variant: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10, textAlign: 'center' }}>
      <Typography variant="h4">Login</Typography>
      <Avatar sx={{ width: 100, height: 100, mx: 'auto', my: 2 }} src={avatar || ''} />
      <Formik
        initialValues={{ username: '', isAdmin: false }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Field
              as={TextField}
              name="username"
              label="Username"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={values.isAdmin}
                  onChange={(e) => setFieldValue('isAdmin', e.target.checked)}
                />
              }
              label={values.isAdmin ? 'Subastador (Admin)' : 'Postor (User)'}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Ingresar
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};