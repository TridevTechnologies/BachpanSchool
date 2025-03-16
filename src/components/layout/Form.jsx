import React, { useState } from 'react';
import '../styles/FormStyles.css';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    parentName: '',
    mobileNumber: '',
    email: '',
    grade: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

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
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);
        if (response.code === 200) {
          setIsSubmitted(true);
          // Reset form
          setFormData({
            parentName: '',
            mobileNumber: '',
            email: '',
            grade: '',
            message: ''
          });
        } else {
          setError(response.message);
        }
      })
      .catch(error => {
        setIsLoading(false);
        setError(error.message || 'Something went wrong. Please try again later.');
      });
  }

  return (
    <div className="inquiry-form-container">
      <div className="inquiry-form-wrapper">
        <div className="inquiry-info-panel">
          <h2 className="inquiry-title">Bachpan Datia - Best ICSE School in Datia</h2>
          
          <div className="inquiry-description">
            <p>Discover a nurturing environment where your child can flourish. Our school offers exceptional education with modern facilities and personalized attention.</p>
          </div>
          
          <div className="why-choose-us">
            <h3>Why Choose Us?</h3>
            <ul className="benefits-list">
              <li>✔ Ranked as the Best ICSE School in Datia</li>
              <li>✔ Highly Experienced & Qualified Faculty</li>
              <li>✔ Optimal Teacher-Student Ratio for Individual Attention</li>
              <li>✔ Best-in-Class Infrastructure for Holistic Learning</li>
              <li>✔ Air-Conditioned Classrooms for a Comfortable Learning Environment</li>
              <li>✔ Safe, Hygienic, and Secure Campus</li>
              <li>✔ 24/7 CCTV Surveillance for Student Safety</li>
            </ul>
          </div>
        </div>
        
        <div className="inquiry-form-panel">
          <h3 className="form-heading">Admission Inquiry</h3>
          
          {isSubmitted ? (
            <div className="success-message">
              <h4>Thank you for your inquiry!</h4>
              <p>We have received your information and will contact you shortly.</p>
              <button 
                className="new-inquiry-btn" 
                onClick={() => setIsSubmitted(false)}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="inquiry-form">
              <div className="form-group">
                <label htmlFor="parentName">Parent's Full Name <span className="required">*</span></label>
                <input 
                  type="text" 
                  id="parentName" 
                  value={formData.parentName} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number <span className="required">*</span></label>
                <input 
                  type="tel" 
                  id="mobileNumber" 
                  value={formData.mobileNumber} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Enter your email (optional)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="grade">Grade (Class) <span className="required">*</span></label>
                <select 
                  id="grade" 
                  value={formData.grade} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="P.C.">Playgroup</option>
                  <option value="Nursery">Nursery</option>
                  <option value="K.G.-1">K.G.-1</option>
                  <option value="K.G.-II">K.G.-II</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                  <option value="V">V</option>
                  <option value="VI">VI</option>
                  <option value="VII">VII</option>
                  <option value="VIII">VIII</option>
                  <option value="IX">IX</option>
                  <option value="X">X</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Information</label>
                <textarea 
                  id="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Any specific requirements or questions"
                  rows="4"
                ></textarea>
              </div>

              {error && <p className="error-message">{error}</p>}

              <div className="form-group">
                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Submit Inquiry'}
                </button>
              </div>
              
              {isLoading && (
                <div className="loading-message">
                  <p>Please wait while we process your inquiry...</p>
                </div>
              )}
              
              <p className="privacy-note">Your information is secure and will only be used to contact you regarding admission inquiries.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
