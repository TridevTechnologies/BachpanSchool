import React from 'react';
import '../styles/WhyChooseUs.css';
import { 
  FaTrophy, 
  FaUserGraduate, 
  FaLaptop, 
  FaUsers,
  FaChalkboardTeacher,
  FaShieldAlt,
  FaBuilding,
  FaEye
} from 'react-icons/fa';

function WhyChooseUs() {
  const features = [
    {
      icon: <FaTrophy className="feature-icon" />,
      title: "Best ICSE School in Datia",
      description: "Ranked as the top ICSE-affiliated school in the region.",
    },
    {
      icon: <FaUserGraduate className="feature-icon" />,
      title: "Highly Experienced Faculty",
      description: "Our team consists of well-qualified, experienced educators.",
    },
    {
      icon: <FaUsers className="feature-icon" />,
      title: "Optimal Teacher-Student Ratio",
      description: "Ensuring personalized attention for each student.",
    },
    {
      icon: <FaBuilding className="feature-icon" />,
      title: "Best-in-Class Infrastructure",
      description: "State-of-the-art facilities for holistic learning.",
    },
    {
      icon: <FaLaptop className="feature-icon" />,
      title: "Air-Conditioned Classrooms",
      description: "Providing a comfortable learning environment.",
    },
    {
      icon: <FaShieldAlt className="feature-icon" />,
      title: "Safe & Secure Campus",
      description: "Hygienic, well-maintained, and child-friendly premises.",
    },
    {
      icon: <FaEye className="feature-icon" />,
      title: "24/7 CCTV Surveillance",
      description: "Complete safety with round-the-clock monitoring.",
    }
  ];

  return (
    <div className="why-choose-section">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose Us?</h2>
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
      </div>
    </div>
  );
}

export default WhyChooseUs;
