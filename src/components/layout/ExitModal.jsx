import React, { useState } from 'react';
import '../styles/ExitModal.css';

function ExitModal({ isOpen, onClose }) {
  const [parentName, setParentName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [grade, setGrade] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch("https://formcarry.com/s/dfbnDSdivD-", {
        method: 'POST',
        headers: { 
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ parentName, number, email, phoneNumber, grade, message })
      });

      const data = await response.json();
      if (data.code === 200) {
        alert("Thank you! Our admission team will contact you within 24 hours.");
        onClose();
        // Reset form fields
        setParentName('');
        setNumber('');
        setEmail('');
        setPhoneNumber('');
        setGrade('');
        setMessage('');
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="exit-modal-overlay" onClick={onClose}>
      <div className="exit-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="exit-modal-close" onClick={onClose}>&times;</button>
        
        <div className="exit-modal-content">
          <div className="exit-modal-header">
            <h2>🌟 Secure Your Child's Future at Bachpan School Datia! 🌟</h2>
            <p className="exit-modal-subhead">
              Don't let this opportunity slip away – give your child the best start in life.
            </p>
          </div>

          <div className="exit-modal-pitch">
            <div className="exit-modal-benefits">
              <h3>Why Choose Us?</h3>
              <ul>
                <li>✔ Ranked as the Best ICSE School in Datia</li>
                <li>✔ Highly Experienced & Qualified Faculty</li>
                <li>✔ Optimal Teacher-Student Ratio for Individual Attention</li>
                <li>✔ Best-in-Class Infrastructure for Holistic Learning</li>
                <li>✔ Air-Conditioned Classrooms for a Comfortable Learning Environment</li>
                <li>✔ Safe, Hygienic, and Secure Campus</li>
                <li>✔ 24/7 CCTV Surveillance for Student Safety</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="exit-modal-form">
              <div className="form-group">
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Parent's Full Name *"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="WhatsApp Number *"
                  required
                />
              </div>

              <div className="form-group">
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                >
                  <option value="">Select Grade *</option>
                  <option value="Pre-Nursery">Pre-Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                </select>
              </div>

              <div className="form-group">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Special Requirements (if any)"
                ></textarea>
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" disabled={isLoading} className="cta-button">
                {isLoading ? 'Sending...' : '🔒 Secure Admission Now!'}
              </button>

              <p className="assurance-text">
                🛡️ Your privacy is our priority. All your information is 100% secure.
              </p>
            </form>
          </div>

          <div className="exit-modal-footer">
            <p>📍 Location: Ramnagar Colony Behind Diet Office , Datia (M.P)</p>
            <p>
              📞 Immediate Assistance: <a href="tel:+911234567890">+91 84508 43097</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExitModal;