import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, MenuItem, Box, Snackbar } from '@mui/material';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  role: Yup.string().required('Role is required').oneOf(['user', 'admin'], 'Invalid role'),
  avatar: Yup.string().url('Invalid URL').optional(),
});

interface UserFormProps {
  onSubmit: (values: { username: string; role: 'user' | 'admin'; avatar?: string }) => void;
  initialValues?: { username: string; role: 'user' | 'admin'; avatar?: string };
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialValues }) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues || { username: '', role: 'user', avatar: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Field
              as={TextField}
              name="username"
              label={t('username')}
              error={touched.username && !!errors.username}
              helperText={touched.username && errors.username}
              fullWidth
            />
            <Field
              as={TextField}
              name="role"
              select
              label={t('role')}
              error={touched.role && !!errors.role}
              helperText={touched.role && errors.role}
              fullWidth
            >
              <MenuItem value="user">{t('user')}</MenuItem>
              <MenuItem value="admin">{t('admin')}</MenuItem>
            </Field>
            <Field
              as={TextField}
              name="avatar"
              label={t('avatarUrl')}
              error={touched.avatar && !!errors.avatar}
              helperText={touched.avatar && errors.avatar}
              fullWidth
            />
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {t('register')}
            </Button>
          </Box>
          <Snackbar
            open={!!errors.username || !!errors.role || !!errors.avatar}
            message={errors.username || errors.role || errors.avatar || ''}
            autoHideDuration={6000}
          />
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;