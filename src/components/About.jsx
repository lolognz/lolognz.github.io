import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { getDataPath } from '../utils/paths';

const About = () => {
  const { i18n } = useTranslation();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const response = await fetch(getDataPath(i18n.language, 'about.json'));
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, [i18n.language]);

  if (loading) {
    return (
      <section id="about" className="section">
        <div className="container">Loading...</div>
      </section>
    );
  }

  if (!aboutData) {
    return (
      <section id="about" className="section">
        <div className="container">Error loading data</div>
      </section>
    );
  }

  return (
    <section id="about" className="section">
      <div className="container">
        <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
          <h2 className="text-center" style={{ marginBottom: '3rem' }}>
            {aboutData.title}
          </h2>
          
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            {/* Content */}
            <div>
              {aboutData.content.map((paragraph, index) => (
                <p key={index} style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Highlights */}
            <div className="card">
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                Highlights
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {aboutData.highlights.map((highlight, index) => (
                  <li 
                    key={index} 
                    style={{ 
                      padding: '0.75rem 0', 
                      borderBottom: index < aboutData.highlights.length - 1 ? '1px solid var(--border-color)' : 'none',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <i className="fas fa-check-circle" style={{ color: 'var(--primary-color)', marginRight: '1rem' }}></i>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;