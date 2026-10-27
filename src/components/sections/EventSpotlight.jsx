import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaDirections, 
  FaPhoneAlt, 
  FaWhatsapp, 
  FaStar 
} from 'react-icons/fa';
import '../styles/EventSpotlight.css';

function EventSpotlight() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Patwari+Farm+House+Datia+Madhya+Pradesh";

  return (
    <section className="event-spotlight-wrapper" id="annual-function">
      <div className="event-spotlight-container">
        
        {/* Header Badge & Title */}
        <motion.div 
          className="spotlight-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="event-badge">
            <FaStar className="star-icon" />
            <span>Upcoming Mega Event 2026</span>
            <FaStar className="star-icon" />
          </div>
          <h2 className="event-title">
            Academic Heights Public School Presents <br />
            <span className="gradient-text">Annual Function: "स्मृतtam 2026"</span>
          </h2>
          <p className="event-tagline">
            "MOMENTS TODAY, MEMORIES FOREVER"
          </p>
        </motion.div>

        {/* Spotlight Card with Banner & Details */}
        <motion.div 
          className="spotlight-card"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Banner Image Display */}
          <div className="banner-image-container">
            <img 
              src={`${process.env.PUBLIC_URL}/ANNUAL FUNCTION BANNER 2026.png`}
              alt="Academic Heights Public School Datia - Annual Function Smritam 2026 Banner" 
              className="event-banner-image"
              loading="lazy"
            />
            <div className="banner-gloss-overlay"></div>
          </div>

          {/* Event Quick Info Grid */}
          <div className="event-info-grid">
            <div className="info-card">
              <div className="info-icon-wrapper calendar">
                <FaCalendarAlt />
              </div>
              <div className="info-text">
                <span className="info-label">DATE</span>
                <span className="info-value">02 November, 2026</span>
                <span className="info-subtext">Save the Date</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrapper clock">
                <FaClock />
              </div>
              <div className="info-text">
                <span className="info-label">TIME</span>
                <span className="info-value">04:45 PM Onwards</span>
                <span className="info-subtext">Evening Gala</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-wrapper map">
                <FaMapMarkerAlt />
              </div>
              <div className="info-text">
                <span className="info-label">VENUE</span>
                <span className="info-value">Patwari Farm House</span>
                <span className="info-subtext">Datia, Madhya Pradesh</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="event-actions-bar">
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="event-btn btn-primary"
            >
              <FaDirections className="btn-icon" />
              <span>Get Directions</span>
            </a>

            <a 
              href="https://wa.me/918450843097?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Annual%20Function%20Smritam%202026." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="event-btn btn-whatsapp"
            >
              <FaWhatsapp className="btn-icon" />
              <span>WhatsApp Inquiry</span>
            </a>

            <a 
              href="tel:+917000564446" 
              className="event-btn btn-call"
            >
              <FaPhoneAlt className="btn-icon" />
              <span>Call School: +91 7000564446</span>
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

export default EventSpotlight;
