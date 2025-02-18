import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import FeeStructure from './pages/FeeStructure';
import './App.css';
import InquiryForm from './components/layout/Form';
import FullGallery from './components/sections/FullGallery';
import ExitModal from './components/layout/ExitModal'; // Import the ExitModal component

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show exit modal when trying to leave the page
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // This triggers the popup on page unload
      setIsModalOpen(true); // Open the modal
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Timer to show modal after inactivity (e.g., 10 seconds)
  useEffect(() => {
    const idleTimer = setTimeout(() => {
      setIsModalOpen(true);
    }, 10000); // 10 seconds of inactivity

    // Clear timeout on user interaction
    const resetTimer = () => {
      clearTimeout(idleTimer);
      setTimeout(() => setIsModalOpen(true), 10000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!'); // Handle form submission
    setIsModalOpen(false);
  };

  return (
    <Router>
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

      {/* Show Exit Modal when isModalOpen is true */}
      <ExitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFormSubmit={handleFormSubmit}
      />
    </Router>
  );
}

export default App;
