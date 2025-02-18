import React, { useEffect } from 'react';
import { scroller } from 'react-scroll';
import HeroCarousel from '../components/home/HeroCarousel';
import AboutUs from '../components/sections/AboutUs';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Gallery from '../components/sections/Gallery';
import Contact from '../components/sections/Contact';
import EnrollmentProcess from '../components/sections/EnrollmentProcess';
import EnrollmentForm from '../components/shared/EnrollmentForm';
import '../components/styles/Home.css';

function Home() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      scroller.scrollTo(hash, {
        smooth: true,
        offset: -70,
        duration: 500,
      });
    } else {
      // If no hash is present, scroll to the top.
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="home" id="top">
      <EnrollmentForm isOpen={false} onClose={() => {}} />
      
      <section className="hero-section">
        <HeroCarousel />
        <div className="hero-cta">
          <button className="btn btn-secondary" onClick={()=> window.location.href = '/inquiry-form'}>
            Apply Now
          </button>
        </div>
      </section>

      {/* Make sure each section has an ID that matches your navbar hashes */}
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
          <h2>Limited Seats Available for 2025-26</h2>
          <p>Secure your child's future today. Admission test on March 23rd, 2025.</p>
          <button className="btn btn-secondary">
            Book a Campus Tour
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
