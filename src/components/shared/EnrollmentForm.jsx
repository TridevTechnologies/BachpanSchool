import React, { useState } from 'react';
import '../styles/EnrollmentForm.css';

function EnrollmentForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    grade: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentName || formData.studentName.length < 2) {
      newErrors.studentName = "Student name must be at least 2 characters";
    }
    if (!formData.parentName || formData.parentName.length < 2) {
      newErrors.parentName = "Parent name must be at least 2 characters";
    }
    if (formData.parentEmail && !/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      newErrors.parentEmail = "Please enter a valid email";
    }
    if (!formData.parentPhone || formData.parentPhone.length < 10) {
      newErrors.parentPhone = "Please enter a valid phone number";
    }
    if (!formData.grade) {
      newErrors.grade = "Please select a grade";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setMessage(null);
      
      try {
        const response = await fetch("https://formcarry.com/s/dfbnDSdivD-", {
          method: 'POST',
          headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
          setMessage({ type: "success", text: "Application submitted successfully!" });
          setFormData({ studentName: '', parentName: '', parentEmail: '', parentPhone: '', grade: '' });
          setTimeout(() => {
            setMessage(null);
            onClose();
          }, 2000);
        } else {
          setMessage({ type: "error", text: result.message || "Submission failed. Please try again." });
        }
      } catch (error) {
        setMessage({ type: "error", text: "An error occurred. Please try again later." });
      }

      setLoading(false);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Apply Now</h2>
        {message && (
          <p className={`message ${message.type === "success" ? "success" : "error"}`}>
            {message.text}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentName">Student's Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter student's name"
            />
            {errors.studentName && <span className="error">{errors.studentName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="parentName">Parent's Name</label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="Enter parent's name"
            />
            {errors.parentName && <span className="error">{errors.parentName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="parentEmail">Parent's Email (Optional)</label>
            <input
              type="email"
              id="parentEmail"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              placeholder="Enter parent's email (optional)"
            />
            {errors.parentEmail && <span className="error">{errors.parentEmail}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="parentPhone">Parent's Phone Number</label>
            <input
              type="tel"
              id="parentPhone"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              placeholder="Enter parent's phone number"
            />
            {errors.parentPhone && <span className="error">{errors.parentPhone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="grade">Grade Applying For</label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            >
              <option value="">Select Grade</option>
              {["Playgroup", "Nursery", "KG1", "KG2", ...Array.from({ length: 10 }, (_, i) => `Grade ${i + 1}`)].map((grade, index) => (
                <option key={index} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
            {errors.grade && <span className="error">{errors.grade}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnrollmentForm;
