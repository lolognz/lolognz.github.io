import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: {
          // Navigation
          nav: {
            home: 'Inicio',
            about: 'Sobre Mí',
            skills: 'Habilidades',
            projects: 'Proyectos',
            blog: 'Blog',
            contact: 'Contacto'
          },
          // Common
          common: {
            loading: 'Cargando...',
            error: 'Error al cargar los datos',
            viewMore: 'Ver más',
            viewLess: 'Ver menos',
            github: 'Ver en GitHub',
            demo: 'Ver Demo',
            download: 'Descargar',
            send: 'Enviar'
          },
          // Footer
          footer: {
            copyright: '© 2024 Lolo González. Todos los derechos reservados.',
            madeWith: 'Hecho con ❤️ y React'
          }
        }
      },
      en: {
        translation: {
          // Navigation
          nav: {
            home: 'Home',
            about: 'About Me',
            skills: 'Skills',
            projects: 'Projects',
            blog: 'Blog',
            contact: 'Contact'
          },
          // Common
          common: {
            loading: 'Loading...',
            error: 'Error loading data',
            viewMore: 'View more',
            viewLess: 'View less',
            github: 'View on GitHub',
            demo: 'View Demo',
            download: 'Download',
            send: 'Send'
          },
          // Footer
          footer: {
            copyright: '© 2024 Lolo González. All rights reserved.',
            madeWith: 'Made with ❤️ and React'
          }
        }
      }
    },
    lng: 'es', // default language
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;