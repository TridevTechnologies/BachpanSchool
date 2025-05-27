import React from 'react';
import { FaBriefcase } from 'react-icons/fa';
import '../styles/Home.css';

function FloatingJobButton({ onClick }) {
  return (
    <button 
      className="floating-job-button"
      onClick={onClick}
      data-tooltip="Apply for Job"
    >
      <FaBriefcase className="float-icon" />
    </button>
  );
}

export default FloatingJobButton; 