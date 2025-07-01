import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      login: 'Login',
      bid: 'Yo ofertó!',
      finalized: 'Finalizado',
      welcome: 'Welcome',
      logout: 'Log out',
      history: 'History',
      users: 'Users',
    },
  },
  es: {
    translation: {
      login: 'Iniciar sesión',
      bid: '¡Yo ofertó!',
      finalized: 'Finalizado',
      welcome: 'Bienvenid@',
      logout: 'Cerrar sesión',
      history: 'Historial',
      users: 'Usuarios',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  interpolation: { escapeValue: false },
});

export default i18n;