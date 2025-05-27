import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { 
  FaBars, 
  FaTimes, 
  FaPhone, 
  FaEnvelope, 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaBriefcase,
  FaGraduationCap,
  FaChevronDown
} from 'react-icons/fa';
import JobApplicationPopup from './JobApplicationPopup';
import '../styles/Navbar.css';

const NAV_ITEMS = [
  { label: "Home", path: "/", isScroll: false },
  { label: "About Us", path: "about", isScroll: true },
  { label: "Why Us", path: "why-choose-us", isScroll: true },
  { label: "Gallery", path: "gallery", isScroll: true },
  { label: "Fee Structure", path: "/fee-structure", isScroll: false },
  { label: "Enrollment", path: "enrollment", isScroll: true },
  { label: "Contact", path: "contact", isScroll: true },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isJobPopupOpen, setIsJobPopupOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.nav-menu.mobile') && !event.target.closest('.mobile-menu-button')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const renderNavLink = (item) => {
    const currentPath = location.pathname;
    const isActive = currentPath === item.path || 
                    (currentPath === "/" && item.isScroll) ||
                    (currentPath.includes(`#${item.path}`));
    const className = `nav-link ${isActive ? "active" : ""}`;
  
    if (item.label === "Home") {
      return (
        <Link
          to="/"
          className={className}
          onClick={(e) => {
            if (currentPath === "/") {
              e.preventDefault();
              scroll.scrollToTop({ duration: 600, smooth: "easeInOutQuad" });
            }
            setIsOpen(false);
          }}
        >
          {item.label}
        </Link>
      );
    }
  
    if (item.isScroll) {
      if (currentPath === "/") {
        return (
          <ScrollLink
            to={item.path}
            spy={true}
            smooth="easeInOutQuad"
            offset={-70}
            duration={600}
            className={className}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </ScrollLink>
        );
      } else {
        return (
          <Link
            to={`/#${item.path}`}
            className={className}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        );
      }
    }
  
    return (
      <Link 
        to={item.path} 
        className={className} 
        onClick={() => setIsOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  const handleJobClick = (e) => {
    e.preventDefault();
    setIsJobPopupOpen(true);
    setIsOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hide' : ''}`}>
        <div className="navbar-container">
          <div className="brand-social-wrapper">
            <Link 
              to="/" 
              className="navbar-brand" 
              onClick={() => {
                if (location.pathname === "/") {
                  scroll.scrollToTop();
                }
                setIsOpen(false);
              }}
            >
              <div className="brand-content">
                <div className="brand-icon">
                  <FaGraduationCap />
                </div>
                <div className="brand-text">
                  <div className="brand-primary">Bachpan</div>
                  <div className="brand-secondary">AHPS School</div>
                </div>
              </div>
            </Link>
          </div>

          <div className="nav-menu desktop">
            {NAV_ITEMS.map((item) => (
              <div key={item.path} className="nav-item">
                {renderNavLink(item)}
              </div>
            ))}
            
            <div className="navbar-actions">
              <button 
                className="apply-button primary" 
                onClick={() => {
                  window.location.href = '/inquiry-form';
                  setIsOpen(false);
                }}
              >
                Apply Now
              </button>

              <button 
                className="job-button secondary" 
                onClick={handleJobClick}
              >
                <FaBriefcase />
                <span>Careers</span>
              </button>
            </div>
          </div>

          <div className="mobile-controls">
            <button 
              className="mobile-menu-button" 
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="nav-menu mobile">
          <div className="mobile-menu-header">
            <div className="mobile-menu-title">Menu</div>
            <button 
              className="mobile-menu-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          {NAV_ITEMS.map((item) => (
            <div key={item.path} className="nav-item">
              {renderNavLink(item)}
            </div>
          ))}
          
          {/* Social Media Links in Mobile Sidebar */}
          <div className="social-links mobile-sidebar">
            <a href="https://www.facebook.com/bachpan.datia/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/bachpandatia/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@bachpanahpsdatia7936" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
          
          <div className="mobile-actions">
            <button 
              className="apply-button primary mobile" 
              onClick={() => {
                window.location.href = '/inquiry-form';
                setIsOpen(false);
              }}
            >
              Apply Now
            </button>

            <button 
              className="job-button secondary mobile" 
              onClick={handleJobClick}
            >
              <FaBriefcase />
              <span>Careers</span>
            </button>
          </div>
        </div>
      )}

      <JobApplicationPopup 
        isOpen={isJobPopupOpen} 
        onClose={() => setIsJobPopupOpen(false)} 
      />
    </>
  );
}

export default Navbar;