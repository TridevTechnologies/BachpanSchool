import React from 'react';
import { 
  FaClipboardList, 
  FaCalendarCheck, 
  FaUserCheck,
  FaFileAlt,
  FaChevronRight,
  FaArrowRight
} from 'react-icons/fa';
import '../styles/EnrollmentProcess.css';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: <FaClipboardList />,
    number: "01",
    title: "Online Registration",
    description: "Begin by filling out our simple digital registration form. Tell us about your child's interests and previous academic journey.",
    color: "#1e3a8a"
  },
  {
    icon: <FaCalendarCheck />,
    number: "02",
    title: "Assessment Test",
    description: "A friendly evaluation to understand your child's current level and potential. We focus on core strengths and creative thinking.",
    color: "#7f1d1d"
  },
  {
    icon: <FaUserCheck />,
    number: "03",
    title: "Meet & Greet",
    description: "An informal interaction with parents and the child. This helps us align our educational goals with your family's expectations.",
    color: "#facc15"
  },
  {
    icon: <FaFileAlt />,
    number: "04",
    title: "Welcome Aboard",
    description: "Finalize document submission and secure the admission. Your journey into the elite world of Academic Heights begins here.",
    color: "#10b981"
  }
];

function EnrollmentProcess() {
  const navigate = useNavigate();

  return (
    <div className="enroll-journey-section">
      <div className="journey-bg-decoration"></div>
      
      <div className="container">
        <div className="journey-header">
          <span className="journey-badge">Admissions Open 2026-2027</span>
          <h2>Your Child's <span>Path to Excellence</span></h2>
          <p>We've streamlined our admission process into four simple steps to ensure a smooth transition for your little one.</p>
        </div>

        <div className="journey-stepper-container">
          <div className="journey-line-connector"></div>
          
          <div className="journey-steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="journey-step-card" style={{"--accent-color": step.color}}>
                <div className="step-card-inner">
                  <div className="step-header">
                    <span className="step-number-tag">{step.number}</span>
                    <div className="step-icon-circle">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>

                  <div className="step-footer-arrow">
                    <FaChevronRight />
                  </div>
                </div>
                
                {/* Visual connectors for desktop */}
                {index < steps.length - 1 && (
                  <div className="step-connector-arrow">
                    <FaArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="journey-cta-wrapper">
          <div className="cta-glass-card">
            <div className="cta-text">
              <h4>Ready to secure your child's future?</h4>
              <p>Limited seats available for the upcoming session. Take the first step today.</p>
            </div>
            <button className="premium-apply-btn" onClick={() => navigate('/inquiry-form')}>
              Start Registration Now
              <span className="btn-glow"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentProcess;
