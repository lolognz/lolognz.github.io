import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { getDataPath } from '../utils/paths';

const Hero = () => {
  const { i18n } = useTranslation();
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const response = await fetch(getDataPath(i18n.language, 'hero.json'));
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        console.error('Error loading hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHeroData();
  }, [i18n.language]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCTAClick = (cta) => {
    if (cta.scrollTo) {
      scrollToSection(cta.scrollTo);
    } else if (cta.url) {
      window.open(cta.url, '_blank');
    }
  };

  if (loading) {
    return (
      <section className="section" style={{ justifyContent: 'center' }}>
        <div>Loading...</div>
      </section>
    );
  }

  if (!heroData) {
    return (
      <section className="section" style={{ justifyContent: 'center' }}>
        <div>Error loading data</div>
      </section>
    );
  }

  return (
    <section id="home" className="section" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`} style={{ textAlign: 'center', color: 'white' }}>
          {/* Profile Image Placeholder */}
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            margin: '0 auto 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
            border: '4px solid rgba(255, 255, 255, 0.2)'
          }}>
            👨‍💻
          </div>

          {/* Name and Title */}
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            {heroData.name}
          </h1>
          
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '400', opacity: '0.9' }}>
            {heroData.title}
          </h2>
          
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem', opacity: '0.8' }}>
            {heroData.subtitle}
          </p>
          
          <p style={{ fontSize: '1rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            {heroData.description}
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            {heroData.social.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  fontSize: '1.5rem'
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
                <i className={`fab fa-${social.icon}`}></i>
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {heroData.ctas.map((cta, index) => (
              <button
                key={index}
                onClick={() => handleCTAClick(cta)}
                className={`btn ${cta.type === 'outline' ? 'btn-outline' : ''}`}
                style={{
                  ...(cta.type === 'outline' ? {
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '2px solid white'
                  } : {
                    backgroundColor: 'white',
                    color: 'var(--primary-color)'
                  })
                }}
                onMouseEnter={(e) => {
                  if (cta.type === 'outline') {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'var(--primary-color)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (cta.type === 'outline') {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = 'white';
                  }
                }}
              >
                {cta.text}
              </button>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div style={{ 
            position: 'absolute', 
            bottom: '2rem', 
            left: '50%', 
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite'
          }}>
            <i className="fas fa-chevron-down" style={{ fontSize: '2rem', opacity: '0.7' }}></i>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-10px);
            }
            60% {
              transform: translateX(-50%) translateY(-5px);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;