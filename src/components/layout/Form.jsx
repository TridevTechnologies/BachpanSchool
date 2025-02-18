import React, { useState } from 'react';
import '../styles/FormStyles.css'; // Make sure this CSS file uses the updated CSS below

export default function InquiryForm() {
  const [parentName, setParentName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [grade, setGrade] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    setError('');

    fetch("https://formcarry.com/s/dfbnDSdivD-", {
      method: 'POST',
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ parentName, number, email, phoneNumber, grade, message })
    })
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        if (response.code === 200) {
          alert("Thank you! We have received your submission.");
          // Optionally, clear form fields here
          setParentName('');
          setNumber('');
          setEmail('');
          setPhoneNumber('');
          setGrade('');
          setMessage('');
        } else {
          setError(response.message);
        }
      })
      .catch(error => {
        setIsLoading(false);
        setError(error.message || 'Something went wrong.');
      });
  }

  return (
    <div className="admissioninquiry-form">
      <div className="admissioninquiry-form-inner">
        <div className="admissioninquiry-form-left">
          <h2 className="admissioninquiry-form-title">
            Best Private School in India
          </h2>
          <p className="admissioninquiry-form-description">
            Discover a nurturing environment where your child can flourish. Our school offers:
            <br /><br />
            • State-of-the-art facilities<br />
            • Personalized attention for every student<br />
            • Holistic development programs<br />
            • World-class extracurricular activities<br />
            • A bright future awaits your child!
          </p>
        </div>
        <div className="admissioninquiry-form-right">
          <form onSubmit={onSubmit} className="admissioninquiry-form-form">
            <div className="admissioninquiry-form-group">
              <label htmlFor="parent-name">Parent's Full Name</label>
              <input 
                type="text" 
                id="parent-name" 
                value={parentName} 
                onChange={(e) => setParentName(e.target.value)} 
                required 
                placeholder="Enter your full name"
              />
            </div>

            <div className="admissioninquiry-form-group">
              <label htmlFor="number">Parent's Contact Number</label>
              <input 
                type="text" 
                id="number" 
                value={number} 
                onChange={(e) => setNumber(e.target.value)} 
                required 
                placeholder="Enter your contact number"
              />
            </div>

            <div className="admissioninquiry-form-group">
              <label htmlFor="email">Email (Optional)</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email (optional)"
              />
            </div>

            <div className="admissioninquiry-form-group">
              <label htmlFor="phone-number">Phone Number</label>
              <input 
                type="text" 
                id="phone-number" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                required 
                placeholder="Enter your phone number"
              />
            </div>

            <div className="admissioninquiry-form-group">
              <label htmlFor="grade">Grade (Class)</label>
              <select 
                id="grade" 
                value={grade} 
                onChange={(e) => setGrade(e.target.value)} 
                required
              >
                <option value="">Select Grade</option>
                <option value="Kindergarten">Kindergarten</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
              </select>
            </div>

            <div className="admissioninquiry-form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Additional information or questions"
              ></textarea>
            </div>

            {error && <p className="admissioninquiry-form-error-message">{error}</p>}

            <div className="admissioninquiry-form-group">
              <button type="submit" className="admissioninquiry-form-submit-btn" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </div>
            {isLoading && (
              <p className="admissioninquiry-form-loading">Please wait, processing your inquiry...</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
