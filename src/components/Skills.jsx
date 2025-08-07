import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

const SkillBar = ({ skill, index, inView }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedLevel(skill.level);
      }, index * 200); // Stagger animation

      return () => clearTimeout(timer);
    }
  }, [inView, skill.level, index]);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '0.5rem'
      }}>
        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
          {skill.name}
        </span>
        <span style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-secondary)',
          fontWeight: '500'
        }}>
          {animatedLevel}/10
        </span>
      </div>
      
      <div style={{
        width: '100%',
        height: '10px',
        backgroundColor: 'var(--border-color)',
        borderRadius: '5px',
        overflow: 'hidden'
      }}>
        <div
          style={{
            width: `${animatedLevel * 10}%`,
            height: '100%',
            background: `linear-gradient(90deg, var(--primary-color), var(--accent-color))`,
            borderRadius: '5px',
            transition: 'width 1s ease-out',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.3) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.3) 75%)',
            backgroundSize: '20px 20px',
            animation: animatedLevel > 0 ? 'slide 2s linear infinite' : 'none'
          }} />
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const { i18n } = useTranslation();
  const [skillsData, setSkillsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const loadSkillsData = async () => {
      try {
        const response = await fetch(`/data/${i18n.language}/skills.json`);
        const data = await response.json();
        setSkillsData(data);
      } catch (error) {
        console.error('Error loading skills data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSkillsData();
  }, [i18n.language]);

  if (loading) {
    return (
      <section id="skills" className="section">
        <div className="container">Loading...</div>
      </section>
    );
  }

  if (!skillsData) {
    return (
      <section id="skills" className="section">
        <div className="container">Error loading data</div>
      </section>
    );
  }

  return (
    <section id="skills" className="section">
      <div className="container">
        <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
          <h2 className="text-center" style={{ marginBottom: '3rem' }}>
            {skillsData.title}
          </h2>
          
          <div className="grid grid-2">
            {skillsData.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="card">
                <h3 style={{ 
                  marginBottom: '2rem', 
                  color: 'var(--primary-color)',
                  borderBottom: '2px solid var(--border-color)',
                  paddingBottom: '0.5rem'
                }}>
                  {category.name}
                </h3>
                
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar 
                    key={skillIndex} 
                    skill={skill} 
                    index={categoryIndex * category.skills.length + skillIndex}
                    inView={inView}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slide {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Skills;