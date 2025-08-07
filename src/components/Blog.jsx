import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { getDataPath } from '../utils/paths';

const Blog = () => {
  const { i18n } = useTranslation();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const response = await fetch(getDataPath(i18n.language, 'blog.json'));
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, [i18n.language]);

  if (loading) {
    return (
      <section id="blog" className="section">
        <div className="container">Loading...</div>
      </section>
    );
  }

  if (!blogData) {
    return (
      <section id="blog" className="section">
        <div className="container">Error loading data</div>
      </section>
    );
  }

  return (
    <section id="blog" className="section">
      <div className="container">
        <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
          <h2 className="text-center" style={{ marginBottom: '1rem' }}>
            {blogData.title}
          </h2>
          
          <p className="text-center" style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-secondary)',
            marginBottom: '4rem'
          }}>
            {blogData.subtitle}
          </p>

          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            {/* Placeholder Content */}
            <div className="card" style={{ 
              textAlign: 'center',
              background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
              color: 'white'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                📝
              </div>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>
                {blogData.placeholder.title}
              </h3>
              <p style={{ opacity: '0.9', lineHeight: '1.6' }}>
                {blogData.placeholder.description}
              </p>
              <div style={{ 
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                fontStyle: 'italic'
              }}>
                {blogData.placeholder.comingSoon}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>
                Temas que abordaré:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {blogData.categories.map((category, index) => (
                  <div 
                    key={index}
                    className="card"
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateX(10px)';
                      e.target.style.borderColor = 'var(--primary-color)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateX(0)';
                      e.target.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i className="fas fa-code" style={{ 
                        color: 'var(--primary-color)', 
                        marginRight: '1rem',
                        fontSize: '1.2rem'
                      }}></i>
                      <span style={{ fontWeight: '600' }}>{category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Signup Placeholder */}
          <div className="card" style={{ 
            marginTop: '3rem',
            textAlign: 'center',
            background: 'var(--bg-secondary)'
          }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
              📧 Mantente al día
            </h3>
            <p style={{ marginBottom: '2rem' }}>
              Suscríbete para recibir notificaciones cuando publique nuevos artículos
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              maxWidth: '400px', 
              margin: '0 auto',
              flexWrap: 'wrap'
            }}>
              <input
                type="email"
                placeholder="tu@email.com"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  minWidth: '200px'
                }}
              />
              <button className="btn" style={{ whiteSpace: 'nowrap' }}>
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;