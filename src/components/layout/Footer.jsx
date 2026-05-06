import React from 'react';
import { Link as WouterLink } from 'wouter';
import { Link as ScrollLink } from 'react-scroll';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaYoutube,
  FaWhatsapp
} from 'react-icons/fa';
import '../styles/Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* School Info */}
          <div className="footer-section brand-section">
            <div className="footer-brand">
              <span className="brand-bachpan">Bachpan</span>
              <span className="brand-academic">& Academic Heights</span>
              <span className="brand-public">Public School</span>
            </div>
            <p className="brand-tagline">Nurturing minds, building futures, and creating leaders of tomorrow through quality education.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/bachpan.datia/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/bachpandatia/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@bachpanahpsdatia7936" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section links-section">
            <h3 className="section-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <ScrollLink to="about" spy={true} smooth={true} duration={500} offset={-70}>About Us</ScrollLink>
              </li>
              <li>
                <ScrollLink to="why-choose-us" spy={true} smooth={true} duration={500} offset={-70}>Why Choose Us</ScrollLink>
              </li>
              <li>
                <ScrollLink to="gallery" spy={true} smooth={true} duration={500} offset={-70}>Gallery</ScrollLink>
              </li>
              <li>
                <WouterLink href="/fee-structure">Fee Structure</WouterLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section contact-section">
            <h3 className="section-title">Contact Us</h3>
            <div className="contact-list">
              <a href="tel:+917000564446" className="contact-item">
                <div className="icon-box"><FaPhone /></div>
                <div className="contact-text">
                  <span className="contact-label">Call Us</span>
                  <span className="contact-value">+91 7000564446</span>
                </div>
              </a>
              <a href="https://wa.me/918450843097" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="icon-box"><FaWhatsapp /></div>
                <div className="contact-text">
                  <span className="contact-label">WhatsApp</span>
                  <span className="contact-value">+91 8450843097</span>
                </div>
              </a>
              <a href="mailto:ahps5150@academicheights.in" className="contact-item">
                <div className="icon-box"><FaEnvelope /></div>
                <div className="contact-text">
                  <span className="contact-label">Email Us</span>
                  <span className="contact-value email-text">ahps5150@academicheights.in</span>
                </div>
              </a>
              <div className="contact-item no-link">
                <div className="icon-box"><FaMapMarkerAlt /></div>
                <div className="contact-text">
                  <span className="contact-label">Visit Us</span>
                  <span className="contact-value">Datia, Madhya Pradesh</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="bottom-content">
            <p>&copy; {year} Bachpan & Academic Heights Public School. All rights reserved.</p>
            <div className="bottom-links">
              <span>Privacy Policy</span>
              <span>Terms of Use</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
