import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const { i18n, t } = useTranslation();
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const loadContactData = async () => {
      try {
        const response = await fetch(`/data/${i18n.language}/contact.json`);
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error('Error loading contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContactData();
  }, [i18n.language]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('¡Mensaje enviado! Te responderé pronto.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const getContactIcon = (type) => {
    switch (type) {
      case 'email':
        return 'fas fa-envelope';
      case 'location':
        return 'fas fa-map-marker-alt';
      case 'linkedin':
        return 'fab fa-linkedin';
      default:
        return 'fas fa-info-circle';
    }
  };

  if (loading) {
    return (
      <section id="contact" className="section">
        <div className="container">Loading...</div>
      </section>
    );
  }

  if (!contactData) {
    return (
      <section id="contact" className="section">
        <div className="container">Error loading data</div>
      </section>
    );
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
          <h2 className="text-center" style={{ marginBottom: '1rem' }}>
            {contactData.title}
          </h2>
          
          <p className="text-center" style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-secondary)',
            marginBottom: '1rem'
          }}>
            {contactData.subtitle}
          </p>

          <p className="text-center" style={{ 
            marginBottom: '4rem',
            maxWidth: '600px',
            margin: '0 auto 4rem'
          }}>
            {contactData.description}
          </p>

          <div className="grid grid-2" style={{ alignItems: 'start' }}>
            {/* Contact Form */}
            <div className="card">
              <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>
                📩 Envía un mensaje
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                  }}>
                    {contactData.form.name.label}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={contactData.form.name.placeholder}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                  }}>
                    {contactData.form.email.label}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={contactData.form.email.placeholder}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                  }}>
                    {contactData.form.subject.label}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={contactData.form.subject.placeholder}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                  }}>
                    {contactData.form.message.label}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={contactData.form.message.placeholder}
                    required
                    rows="5"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      resize: 'vertical',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1.1rem',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane" style={{ marginRight: '0.5rem' }}></i>
                      {contactData.form.submit}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>
                📞 Información de contacto
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {contactData.contact_info.map((info, index) => (
                  <div 
                    key={index}
                    className="card"
                    style={{
                      padding: '1.5rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-5px)';
                      e.target.style.borderColor = 'var(--primary-color)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i 
                        className={getContactIcon(info.type)} 
                        style={{ 
                          color: 'var(--primary-color)', 
                          marginRight: '1rem',
                          fontSize: '1.5rem',
                          width: '30px',
                          textAlign: 'center'
                        }}
                      ></i>
                      <div>
                        <div style={{ 
                          fontWeight: '600', 
                          color: 'var(--text-primary)',
                          marginBottom: '0.25rem'
                        }}>
                          {info.label}
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>
                          {info.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="card" style={{ 
                marginTop: '2rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
                color: 'white'
              }}>
                <h4 style={{ color: 'white', marginBottom: '1rem' }}>
                  🔗 Enlaces rápidos
                </h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <a
                    href="https://linkedin.com/in/lologonzalez"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'white',
                      fontSize: '2rem',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="https://github.com/lolognz"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'white',
                      fontSize: '2rem',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;