import React, { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import HeroCarousel from "../components/home/HeroCarousel";
import AboutUs from "../components/sections/AboutUs";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Gallery from "../components/sections/Gallery";
import Contact from "../components/sections/Contact";
import EnrollmentProcess from "../components/sections/EnrollmentProcess";
import EnrollmentForm from "../components/shared/EnrollmentForm";
import "../components/styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [isEnrollmentOpen, setEnrollmentOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      scroller.scrollTo(hash, {
        smooth: true,
        offset: -70,
        duration: 500,
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="home" id="top">
      <EnrollmentForm isOpen={isEnrollmentOpen} onClose={() => setEnrollmentOpen(false)} />

      <section className="hero-section">
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

      <section className="cta-section">
        <div className="container">
          
          <button className="btn btn-secondary" onClick={() => setEnrollmentOpen(true)}>
            Book a Campus Tour
          </button>
        </div>
      </section>

      {/* Floating WhatsApp & Call Buttons */}
      <div className="floating-buttons">
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
