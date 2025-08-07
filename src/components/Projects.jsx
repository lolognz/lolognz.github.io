import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { getDataPath } from '../utils/paths';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      if (!isHovered) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        overflow: 'hidden',
        height: '400px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Project Image */}
      <div style={{
        width: '100%',
        height: '200px',
        background: `linear-gradient(135deg, var(--primary-color), var(--accent-color))`,
        borderRadius: '0.5rem 0.5rem 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        color: 'white',
        marginBottom: '1rem'
      }}>
        💻
      </div>

      {/* Project Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
          {project.title}
        </h3>
        
        <p style={{ 
          fontSize: '0.9rem', 
          lineHeight: '1.6', 
          marginBottom: '1rem',
          flex: 1
        }}>
          {project.description}
        </p>

        {/* Technologies */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem'
          }}>
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--primary-color)',
                  fontSize: '0.8rem',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border-color)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          marginTop: 'auto'
        }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ 
                fontSize: '0.8rem',
                padding: '0.5rem 1rem',
                flex: 1,
                textAlign: 'center',
                textDecoration: 'none'
              }}
            >
              <i className="fab fa-github" style={{ marginRight: '0.5rem' }}></i>
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ 
                fontSize: '0.8rem',
                padding: '0.5rem 1rem',
                flex: 1,
                textAlign: 'center',
                textDecoration: 'none'
              }}
            >
              <i className="fas fa-external-link-alt" style={{ marginRight: '0.5rem' }}></i>
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { i18n } = useTranslation();
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const loadProjectsData = async () => {
      try {
        const response = await fetch(getDataPath(i18n.language, 'projects.json'));
        const data = await response.json();
        setProjectsData(data);
      } catch (error) {
        console.error('Error loading projects data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjectsData();
  }, [i18n.language]);

  if (loading) {
    return (
      <section id="projects" className="section">
        <div className="container">Loading...</div>
      </section>
    );
  }

  if (!projectsData) {
    return (
      <section id="projects" className="section">
        <div className="container">Error loading data</div>
      </section>
    );
  }

  return (
    <section id="projects" className="section">
      <div className="container">
        <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
          <h2 className="text-center" style={{ marginBottom: '3rem' }}>
            {projectsData.title}
          </h2>
          
          <div className="grid grid-3">
            {projectsData.projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;