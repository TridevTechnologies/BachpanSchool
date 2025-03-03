import React from 'react';
import '../styles/AboutUs.css';
 
function AboutUs() {
  const milestones = [
    {
      year: "2013",
      title: "Bachpan Play School",
      description: "Began its journey with a pre-school, providing a strong foundation for early learning.",
    },
    {
      year: "2015",
      title: "Academic Heights Public School",
      description: "Expanded into a formal school, offering quality education with a focus on holistic development.",
    },
    {
      year: "2024",
      title: "ICSE Affiliation",
      description: "Achieved a significant milestone by becoming an ICSE-affiliated school.",
    },
    {
      year: "Today",
      title: "Continued Excellence",
      description: "Providing quality education, blending innovation, values, and global standards to nurture future leaders.",
    },
  ];

  return (
    <div className="about-section">
      <div className="container">
        <div className="about-header">
          <h2>Our Story</h2>
          <p>Building a foundation of excellence in education since 2013</p>
        </div>

        <div className="mission-vision-grid">
          <div className="info-card">
            <h2>Our Mission</h2>
            <p>
              To Educate, Empower, and Excel. We strive to nurture the unique potential of every child by providing a safe, supportive, and stimulating learning environment. We aim to foster both academic excellence and social growth, ensuring that every student thrives with confidence and curiosity.
            </p>
          </div>
          <div className="info-card">
            <h2>Our Vision</h2>
            <p>
              To provide world-class quality education in Datia, blending innovation, technology, and values to nurture confident and competent global citizens.
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