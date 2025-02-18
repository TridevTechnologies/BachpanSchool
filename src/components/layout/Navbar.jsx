import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
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
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > lastScrollY) {
        document.querySelector(".navbar").classList.add("hide");
      } else {
        document.querySelector(".navbar").classList.remove("hide");
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const renderNavLink = (item) => {
    const currentPath = location.pathname;
    const activeClass = currentPath === item.path ? "active" : "";
    const className = `nav-link ${activeClass}`;
  
    if (item.label === "Home") {
      return (
        <Link
          to="/"
          className={className}
          onClick={(e) => {
            if (currentPath === "/") {
              e.preventDefault(); // Stop full reload
              scroll.scrollToTop({ duration: 600, smooth: "easeInOutQuad" });
            } else {
              setIsOpen(false);
            }
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
      <Link to={item.path} className={className} onClick={() => setIsOpen(false)}>
        {item.label}
      </Link>
    );
  };
  

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={() => scroll.scrollToTop()}>
          Bachpan School
        </Link>

        <div className="nav-menu desktop">
          {NAV_ITEMS.map((item) => (
            <div key={item.path} className="nav-item">
              {renderNavLink(item)}
            </div>
          ))}
          <button className="apply-button" onClick={()=> window.location.href = '/inquiry-form'}>Apply Now</button>
        </div>

        <button className="mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {isOpen && (
          <div className="nav-menu mobile">
            {NAV_ITEMS.map((item) => (
              <div key={item.path} className="nav-item">
                {renderNavLink(item)}
              </div>
            ))}
            <button
  className="apply-button mobile"
  onClick={() => window.location.href = '/inquiry-form'}
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
