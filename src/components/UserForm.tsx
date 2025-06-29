import { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { registerUser } from '../services/userService';

interface UserFormProps {
  onSuccess?: () => void;
}

const UserForm = ({ onSuccess }: UserFormProps) => {
  const { setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      role: 'user' as 'user' | 'admin',
      avatar: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('El nombre de usuario es obligatorio').min(3, 'Mínimo 3 caracteres'),
      role: Yup.string().oneOf(['user', 'admin']).required('El rol es obligatorio'),
      avatar: Yup.string().url('Debe ser una URL válida').optional(),
    }),
    onSubmit: async (values) => {
      try {
        const newUser = await registerUser(values);
        setUser(newUser);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="username"
        name="username"
        label="Nombre de usuario"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="role-label">Rol</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
        >
          <MenuItem value="user">Usuario</MenuItem>
          <MenuItem value="admin">Administrador</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        id="avatar"
        name="avatar"
        label="URL del avatar (opcional)"
        value={formik.values.avatar}
        onChange={formik.handleChange}
        error={formik.touched.avatar && Boolean(formik.errors.avatar)}
        helperText={formik.touched.avatar && formik.errors.avatar}
        margin="normal"
      />
      <Button color="primary" variant="contained" type="submit">
        Registrar
      </Button>
    </form>
  );
};

export default UserForm;