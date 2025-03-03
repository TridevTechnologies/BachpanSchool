import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import FeeStructure from './pages/FeeStructure';
import InquiryForm from './components/layout/Form';
import FullGallery from './components/sections/FullGallery';
import ExitModal from './components/layout/ExitModal';
import ScrollToTop from './components/layout/ScrollToTop';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  useEffect(() => {
    // Track if modal has been shown during this session
    const modalShown = sessionStorage.getItem('exitModalShown');
    if (modalShown) {
      setHasShownModal(true);
    }

    // Show modal when trying to close or reload the page
    const handleBeforeUnload = (event) => {
      if (!hasShownModal) {
        event.preventDefault();
        setIsModalOpen(true);
        setHasShownModal(true);
        sessionStorage.setItem('exitModalShown', 'true');
        return (event.returnValue = 'Are you sure you want to leave?');
      }
    };

    const handleMouseLeave = (event) => {
      if (event.clientY <= 0 && !hasShownModal) {
        setIsModalOpen(true);
        setHasShownModal(true);
        sessionStorage.setItem('exitModalShown', 'true');
      }
    };

    const handleTouchMove = (event) => {
      if (event.touches[0].clientY < 50 && !hasShownModal) {
        setIsModalOpen(true);
        setHasShownModal(true);
        sessionStorage.setItem('exitModalShown', 'true');
      }
    };

    const handleUserActivity = () => {
      setLastActivityTime(Date.now());
    };

    const inactivityTimer = setInterval(() => {
      const inactiveTime = Date.now() - lastActivityTime;
      if (inactiveTime > 120000 && !hasShownModal) {
        setIsModalOpen(true);
        setHasShownModal(true);
        sessionStorage.setItem('exitModalShown', 'true');
      }
    }, 30000);

    const handlePopState = () => {
      if (!hasShownModal) {
        setIsModalOpen(true);
        setHasShownModal(true);
        sessionStorage.setItem('exitModalShown', 'true');
      }
    };

    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('popstate', handlePopState);
      clearInterval(inactivityTimer);

      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [hasShownModal, lastActivityTime]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!hasShownModal) {
        setIsModalOpen(true);
        setHasShownModal(true);
        sessionStorage.setItem('exitModalShown', 'true');
      }
    }, 45000);

    return () => clearTimeout(timeoutId);
  }, [hasShownModal]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    setIsModalOpen(false);
  };

  return (
    <Router>
      <ScrollToTop /> {/* This ensures the page always scrolls to the top on route change */}
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fee-structure" element={<FeeStructure />} />
            <Route path="/inquiry-form" element={<InquiryForm />} />
            <Route path="/full-gallery" element={<FullGallery />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* Exit Modal */}
      <ExitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFormSubmit={handleFormSubmit}
      />
    </Router>
  );
}

export default App;
