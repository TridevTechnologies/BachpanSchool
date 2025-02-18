import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import FeeStructure from './pages/FeeStructure';
import './App.css';
import InquiryForm from './components/layout/Form';
import FullGallery from './components/sections/FullGallery';
import ExitModal from './components/layout/ExitModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeoutDuration, setTimeoutDuration] = useState(30000); // Start at 30 sec
  let modalShowCount = 0; // Keep count within session only

  useEffect(() => {
    // Check if the user is revisiting the site (refresh)
    const isReturningUser = localStorage.getItem('returningUser');

    if (isReturningUser) {
      setTimeoutDuration(10000); // If user refreshes, show modal after 10 sec
    } else {
      localStorage.setItem('returningUser', 'true'); // Mark user as returning
    }

    let idleTimer;

    const startIdleTimer = () => {
      idleTimer = setTimeout(() => {
        setIsModalOpen(true);
        modalShowCount += 1;

        // Set exponential timeout: 30s → 1m → 2m → 4m (Only for current session)
        if (modalShowCount === 1) setTimeoutDuration(60000); // 1 min
        else if (modalShowCount === 2) setTimeoutDuration(120000); // 2 min
        else if (modalShowCount === 3) setTimeoutDuration(240000); // 4 min
      }, timeoutDuration);
    };

    startIdleTimer();

    const resetTimer = () => {
      clearTimeout(idleTimer);
      startIdleTimer();
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [timeoutDuration]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
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
