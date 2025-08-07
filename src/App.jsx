import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: 'var(--primary-color)'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      {/* Language Selector */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        gap: '10px'
      }}>
        <button
          onClick={() => i18n.changeLanguage('es')}
          style={{
            background: i18n.language === 'es' ? 'var(--primary-color)' : 'transparent',
            color: i18n.language === 'es' ? 'white' : 'var(--primary-color)',
            border: '2px solid var(--primary-color)',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ES
        </button>
        <button
          onClick={() => i18n.changeLanguage('en')}
          style={{
            background: i18n.language === 'en' ? 'var(--primary-color)' : 'transparent',
            color: i18n.language === 'en' ? 'white' : 'var(--primary-color)',
            border: '2px solid var(--primary-color)',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          EN
        </button>
      </div>

      {/* Main Content */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;