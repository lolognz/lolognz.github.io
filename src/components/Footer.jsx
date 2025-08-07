import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationItems = [
    { key: 'home', label: t('nav.home'), id: 'home' },
    { key: 'about', label: t('nav.about'), id: 'about' },
    { key: 'skills', label: t('nav.skills'), id: 'skills' },
    { key: 'projects', label: t('nav.projects'), id: 'projects' },
    { key: 'blog', label: t('nav.blog'), id: 'blog' },
    { key: 'contact', label: t('nav.contact'), id: 'contact' }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      url: 'https://linkedin.com/in/lologonzalez',
      color: '#0077b5'
    },
    {
      name: 'GitHub',
      icon: 'fab fa-github',
      url: 'https://github.com/lolognz',
      color: '#333'
    },
    {
      name: 'Email',
      icon: 'fas fa-envelope',
      url: 'mailto:lolo@example.com',
      color: '#ea4335'
    }
  ];

  return (
    <footer style={{
      background: 'linear-gradient(135deg, var(--text-primary), #374151)',
      color: 'white',
      padding: '3rem 0 1rem'
    }}>
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
          {/* Brand Section */}
          <div>
            <h3 style={{ 
              color: 'white', 
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>
              Lolo González
            </h3>
            <p style={{ 
              opacity: '0.8', 
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Backend Software Engineer especializado en Java, Spring Boot y arquitecturas escalables.
            </p>
            
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = social.color;
                    e.target.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                  title={social.name}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ 
              color: 'white', 
              marginBottom: '1rem',
              fontSize: '1.2rem'
            }}>
              Navegación
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255, 255, 255, 0.8)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      padding: '0.25rem 0',
                      transition: 'all 0.3s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    <i className="fas fa-chevron-right" style={{ marginRight: '0.5rem', fontSize: '0.8rem' }}></i>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ 
              color: 'white', 
              marginBottom: '1rem',
              fontSize: '1.2rem'
            }}>
              Contacto
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', opacity: '0.8' }}>
                <i className="fas fa-envelope" style={{ marginRight: '0.75rem', width: '20px' }}></i>
                <span>lolo@example.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', opacity: '0.8' }}>
                <i className="fas fa-map-marker-alt" style={{ marginRight: '0.75rem', width: '20px' }}></i>
                <span>España</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', opacity: '0.8' }}>
                <i className="fas fa-globe" style={{ marginRight: '0.75rem', width: '20px' }}></i>
                <span>Disponible para proyectos remotos</span>
              </div>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              style={{
                marginTop: '1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-arrow-up"></i>
              Volver arriba
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(255, 255, 255, 0.2)',
          margin: '2rem 0'
        }}></div>

        {/* Bottom Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ opacity: '0.8', fontSize: '0.9rem' }}>
            {t('footer.copyright')}
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            opacity: '0.8',
            fontSize: '0.9rem'
          }}>
            {t('footer.madeWith')}
            <i className="fab fa-react" style={{ 
              marginLeft: '0.5rem', 
              color: '#61dafb',
              animation: 'spin 3s linear infinite'
            }}></i>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @media (max-width: 768px) {
            .grid-3 {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;