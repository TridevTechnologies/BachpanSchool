import React from 'react';
import '../styles/WhyChooseUs.css';
import { 
  FaTrophy, 
  FaUserGraduate, 
  FaLaptop, 
  FaUsers,
  FaChalkboardTeacher,
  FaSmile,
  FaMedal
} from 'react-icons/fa';

function WhyChooseUs() {
  const features = [
    {
      icon: <FaTrophy className="feature-icon" />,
      title: "Academic Excellence",
      description: "Consistently achieving outstanding academic results with a 100% success rate",
    },
    {
      icon: <FaUserGraduate className="feature-icon" />,
      title: "Experienced Faculty",
      description: "Highly qualified teachers with years of experience in education",
    },
    {
      icon: <FaLaptop className="feature-icon" />,
      title: "Smart Classrooms",
      description: "Modern technology-enabled learning environments",
    },
    {
      icon: <FaUsers className="feature-icon" />,
      title: "Small Class Sizes",
      description: "Personalized attention with optimal teacher-student ratio",
    },
  ];

  const stats = [
    { number: "100%", label: "Pass Rate", icon: <FaMedal /> },
    { number: "50+", label: "Expert Teachers", icon: <FaChalkboardTeacher /> },
    { number: "1000+", label: "Happy Students", icon: <FaSmile /> },
    { number: "25+", label: "Awards Won", icon: <FaTrophy /> },
  ];

  return (
    <div className="why-choose-section">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose Bachpan Height School?</h2>
          <p>
            We provide an enriching educational environment that nurtures excellence
            and prepares students for future success.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
