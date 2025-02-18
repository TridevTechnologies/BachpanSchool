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

const steps = [
  {
    icon: <FaClipboardList className="step-icon" />,
    title: "Step 1: Online Registration",
    description:
      "Fill out the online registration form with basic details about the student and parent/guardian.",
  },
  {
    icon: <FaFileAlt className="step-icon" />,
    title: "Step 2: Document Submission",
    description:
      "Submit required documents including birth certificate, previous school records, and passport-size photographs.",
  },
  {
    icon: <FaCalendarCheck className="step-icon" />,
    title: "Step 3: Entrance Test",
    description:
      "Appear for the entrance test scheduled on March 23rd, 2025. Test includes core subjects evaluation.",
  },
  {
    icon: <FaUserCheck className="step-icon" />,
    title: "Step 4: Personal Interview",
    description:
      "Student and parents interview with school administrators to understand mutual expectations.",
  },
];

function EnrollmentProcess() {
  return (
    <div className="enrollment-section">
      <div className="container">
        <div className="section-header">
          <h2>Enrollment Process</h2>
          <p>Begin your journey with Bachpan Height School</p>
        </div>

        <div className="important-dates">
          <div className="date-card">
            <FaClock className="date-icon" />
            <h3>Application Deadline</h3>
            <p>March 15th, 2025</p>
          </div>
          <div className="date-card">
            <FaBook className="date-icon" />
            <h3>Entrance Test Date</h3>
            <p>March 23rd, 2025</p>
          </div>
          <div className="date-card">
            <FaSchool className="date-icon" />
            <h3>Session Begins</h3>
            <p>April 1st, 2025</p>
          </div>
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
          <button className="cta-button">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentProcess;
