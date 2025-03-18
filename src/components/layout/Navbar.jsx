import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { FaBars, FaTimes, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import "../styles/Navbar.css";

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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 50);
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${isHidden ? "hide" : ""}`}>
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
            Bachpan|AHPS School
          </Link>
          
          {/* Social Media Links in Desktop View */}
          <div className="social-links desktop">
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
        </div>

        <div className="nav-menu desktop">
          {NAV_ITEMS.map((item) => (
            <div key={item.path} className="nav-item">
              {renderNavLink(item)}
            </div>
          ))}
          
          <button 
            className="apply-button" 
            onClick={() => {
              window.location.href = '/inquiry-form';
              setIsOpen(false);
            }}
          >
            Apply Now
          </button>
        </div>

        <div className="mobile-controls">
          {/* Removed social media links from mobile header */}
          <button 
            className="mobile-menu-button" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isOpen && (
          <div className="nav-menu mobile">
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
            
            <button 
              className="apply-button mobile" 
              onClick={() => {
                window.location.href = '/inquiry-form';
                setIsOpen(false);
              }}
            >
              Apply Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;