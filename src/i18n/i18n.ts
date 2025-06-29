import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        username: 'Username',
        role: 'Role',
        avatarUrl: 'Avatar URL (optional)',
        register: 'Register',
        user: 'User',
        admin: 'Admin',
      },
    },
    es: {
      translation: {
        username: 'Nombre de usuario',
        role: 'Rol',
        avatarUrl: 'URL del avatar (opcional)',
        register: 'Registrarse',
        user: 'Usuario',
        admin: 'Administrador',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;