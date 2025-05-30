import React from 'react';
import '../styles/JobApplicationPopup.css';

function JobApplicationPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="job-popup-overlay" onClick={onClose}>
      <div className="job-popup-content" onClick={e => e.stopPropagation()}>
        <button className="job-popup-close" onClick={onClose}>&times;</button>
        <div className="job-popup-message">
          <h3>Hey there! 👋</h3>
          <p>Join Our Team – Grow Your Career With Us!.</p>
          <p>Kindly send your resume to</p>
          <a href="mailto:hr.schooldatia@gmail.com" className="job-popup-email">
            📧 hr.schooldatia@gmail.com
          </a>
          <p>and our team member will get in touch with you soon!</p>
        </div>
      </div>
    </div>
  );
}

export default JobApplicationPopup; 