import React, { useState, useEffect } from 'react';
import { FaBullhorn, FaTimes, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/AnnouncementBar.css';

function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('annualFunctionTickerDismissed');
    if (isDismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('annualFunctionTickerDismissed', 'true');
  };

  const handleScrollToEvent = () => {
    const eventElement = document.getElementById('annual-function');
    if (eventElement) {
      eventElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/#annual-function';
    }
  };

  if (!isVisible) return null;

  const announcementText = (
    <span className="marquee-item" onClick={handleScrollToEvent}>
      <span className="marquee-highlight">🎉 ANNUAL FUNCTION: "स्मृतtam 2026"</span>
      <span className="marquee-separator">•</span>
      <span className="marquee-segment"><FaCalendarAlt className="inline-icon" /> 02 November, 2026</span>
      <span className="marquee-separator">•</span>
      <span className="marquee-segment"><FaClock className="inline-icon" /> 04:45 PM Onwards</span>
      <span className="marquee-separator">•</span>
      <span className="marquee-segment"><FaMapMarkerAlt className="inline-icon" /> Patwari Farm House, Datia (M.P.)</span>
      <span className="marquee-separator">•</span>
      <span className="marquee-tagline">"Moments Today, Memories Forever"</span>
      <span className="marquee-cta">[Click for Details]</span>
    </span>
  );

  return (
    <div className="announcement-bar-fixed" role="region" aria-label="Annual Function Announcement">
      {/* Static Label Badge on Left */}
      <div className="announcement-badge-wrapper" onClick={handleScrollToEvent}>
        <span className="announcement-pulse-dot"></span>
        <FaBullhorn className="announcement-bell-icon" />
        <span className="announcement-badge-text">Notice</span>
      </div>

      {/* Scrolling Marquee Container */}
      <div className="announcement-marquee-container">
        <div className="announcement-marquee-track">
          {announcementText}
          {announcementText}
        </div>
      </div>

      {/* Dismiss Button on Right */}
      <button 
        className="announcement-close-btn" 
        onClick={handleDismiss}
        aria-label="Close Announcement Bar"
        title="Dismiss announcement"
      >
        <FaTimes />
      </button>
    </div>
  );
}

export default AnnouncementBar;
