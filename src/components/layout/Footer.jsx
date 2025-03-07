import React from 'react';
import { Link as WouterLink } from 'wouter';
import { Link as ScrollLink } from 'react-scroll';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt 
} from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* School Info */}
          <div className="footer-section">
            <h3> Bachpan & Academic Heights Public School. All rights reserved</h3>
            <p>Nurturing minds, building futures, and creating leaders of tomorrow through quality education.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/bachpan.datia/" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
             
              <a href="https://www.instagram.com/bachpandatia/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <ScrollLink to="about" smooth={true} duration={500}>About Us</ScrollLink>
              </li>
              <li>
                <ScrollLink to="why-choose-us" smooth={true} duration={500}>Why Choose Us</ScrollLink>
              </li>
              <li>
                <ScrollLink to="gallery" smooth={true} duration={500}>Gallery</ScrollLink>
              </li>
              <li>
                <WouterLink href="/fee-structure">Fee Structure</WouterLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <p>
                <FaPhone /> +91 8450843097
              </p>
              <p>
                <FaEnvelope />  ahps5150@academicheights.in
              </p>
              <p>
                <FaMapMarkerAlt /> Datia, Madhya Pradesh
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {year} Bachpan & Academic Heights Public School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
