import React from 'react';
import '../styles/AboutUs.css';
 
function AboutUs() {
  const milestones = [
    {
      year: "2010",
      title: "Foundation",
      description: "Established with a vision to provide quality education",
    },
    {
      year: "2015",
      title: "Infrastructure Expansion",
      description: "Added new academic block and modern facilities",
    },
    {
      year: "2018",
      title: "Excellence Award",
      description: "Recognized as one of the top schools in the region",
    },
    {
      year: "2020",
      title: "Digital Integration",
      description: "Implemented smart classrooms and digital learning",
    },
  ];

  return (
    <div className="about-section">
      <div className="container">
        <div className="about-header">
          <h2>Our Story</h2>
          <p>Building a foundation of excellence in education since 2010</p>
        </div>

        <div className="mission-vision-grid">
          <div className="info-card">
            <h2>Our Mission</h2>
            <p>
              To provide holistic education that nurtures academic excellence,
              character development, and life skills, preparing students to become
              responsible global citizens.
            </p>
          </div>
          <div className="info-card">
            <h2>Our Vision</h2>
            <p>
              To be a leading educational institution that inspires innovation,
              fosters creativity, and empowers students to achieve their full potential.
            </p>
          </div>
        </div>

        <div className="timeline-section">
          <h2>Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <span className="year">{milestone.year}</span>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
