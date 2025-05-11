import React from 'react';
import { 
  FaClipboardList, 
  FaFileAlt, 
  FaCalendarCheck, 
  FaUserCheck,
  FaClock,
  FaBook,
  FaSchool
} from 'react-icons/fa';
import '../styles/EnrollmentProcess.css';
import { useNavigate } from 'react-router-dom';
const steps = [
  {
    icon: <FaClipboardList className="step-icon" />,
    title: "Step 1: Online Registration",
    description:
      "Fill out the online registration form with basic details about the student and parent/guardian.",
  },
  {
    icon: <FaCalendarCheck className="step-icon" />,
    title: "Step 2: Entrance Test",
    description:
      "Appear for the entrance test scheduled on March 19TH, 2025. Test includes core subjects evaluation.",
  },
  {
    icon: <FaUserCheck className="step-icon" />,
    title: "Step 3: Personal Interview",
    description:
      "Student and parents interview with school administrators to understand mutual expectations.",
  },
  {
    icon: <FaFileAlt className="step-icon" />,
    title: "Step 4: Document Submission",
    description:
      "Submit required documents including birth certificate, previous school records, and passport-size photographs.",
  },
  
  
];

function EnrollmentProcess() {
  const navigate = useNavigate();
  return (
    <div className="enrollment-section">
      <div className="container">
        <div className="section-header">
          <h2>Enrollment Process</h2>
          <p>Begin your journey with Bachpan Academic heights public school</p>
        </div>

     
      

        <div className="enrollment-steps">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-icon-wrapper">
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        <div className="enrollment-cta">
        <button className="cta-button" onClick={() => navigate('/inquiry-form')}>
      Apply Now
    </button>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentProcess;
