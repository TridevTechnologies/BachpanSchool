import React, { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import HeroCarousel from "../components/home/HeroCarousel";
import AboutUs from "../components/sections/AboutUs";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Gallery from "../components/sections/Gallery";
import Contact from "../components/sections/Contact";
import EnrollmentProcess from "../components/sections/EnrollmentProcess";
import EnrollmentForm from "../components/shared/EnrollmentForm";
import FloatingJobButton from "../components/layout/FloatingJobButton";
import JobApplicationPopup from "../components/layout/JobApplicationPopup";
import "../components/styles/Home.css";

function Home() {
  const [isEnrollmentOpen, setEnrollmentOpen] = useState(false);
  const [isJobPopupOpen, setIsJobPopupOpen] = useState(false);

  useEffect(() => {
    // Only scroll to hash if it's NOT a page refresh/reload
    const isReload = window.performance.navigation.type === 1;
    const hash = window.location.hash.replace("#", "");
    
    if (hash && !isReload) {
      scroller.scrollTo(hash, {
        smooth: true,
        offset: -70,
        duration: 500,
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="home" id="top">
      <EnrollmentForm isOpen={isEnrollmentOpen} onClose={() => setEnrollmentOpen(false)} />
      <JobApplicationPopup isOpen={isJobPopupOpen} onClose={() => setIsJobPopupOpen(false)} />

      <section id="hero" className="hero-section">
        <HeroCarousel />
      </section>

      <section id="about" className="section">
        <AboutUs />
      </section>

      <section id="why-choose-us" className="section bg-light">
        <WhyChooseUs />
      </section>

      <section id="gallery" className="section">
        <Gallery />
      </section>

      <section id="enrollment" className="section bg-light">
        <EnrollmentProcess />
      </section>

      <section id="contact" className="section">
        <Contact />
      </section>

      {/* Floating Buttons */}
      <div className="floating-buttons">
        <FloatingJobButton onClick={() => setIsJobPopupOpen(true)} />
        <a href="https://wa.me/918450843097" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
          <FaWhatsapp className="float-icon whatsapp-icon" />
        </a>
        <a href="tel:+917000564446" className="call-float">
          <FaPhoneAlt className="float-icon call-icon" />
        </a>
      </div>

    </div>
  );
}

export default Home;
