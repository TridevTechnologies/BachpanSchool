import React, { useState } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="contact-modern-section">
      <div className="contact-overlay-bg"></div>
      
      <div className="container">
        <div className="contact-premium-header">
          <span className="premium-badge">Get In Touch</span>
          <h2>Connect With Our <span>Campus</span></h2>
          <p>Have questions about admissions or school life? We're here to help you every step of the way.</p>
        </div>

        <div className="contact-main-grid">
          {/* Contact Info Card */}
          <div className="contact-details-card">
            <div className="details-header">
              <h3>Contact Information</h3>
              <p>Fill out the form and our team will get back to you within 24 hours.</p>
            </div>

            <div className="info-items-list">
              <div className="modern-info-item">
                <div className="info-icon-wrapper">
                  <FaPhone />
                </div>
                <div className="info-text">
                  <span>Call Us Anytime</span>
                  <p>+91 7000564446</p>
                </div>
              </div>

              <div className="modern-info-item">
                <div className="info-icon-wrapper">
                  <FaEnvelope />
                </div>
                <div className="info-text">
                  <span>Email Support</span>
                  <p>ahps5150@academicheights.in</p>
                </div>
              </div>

              <div className="modern-info-item">
                <div className="info-icon-wrapper">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-text">
                  <span>Visit Our Campus</span>
                  <p>Datia, Madhya Pradesh</p>
                </div>
              </div>

              <div className="modern-info-item">
                <div className="info-icon-wrapper">
                  <FaClock />
                </div>
                <div className="info-text">
                  <span>Office Hours</span>
                  <p>Mon - Sat: 8:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-social-pills">
              <a href="#" className="social-pill"><FaFacebookF /></a>
              <a href="#" className="social-pill"><FaInstagram /></a>
              <a href="https://wa.me/917000564446" className="social-pill"><FaWhatsapp /></a>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="contact-form-card">
            <form onSubmit={handleSubmit} className="modern-contact-form">
              <div className="form-row">
                <div className="form-group-floating">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="name">Full Name</label>
                  {errors.name && <span className="error-hint">{errors.name}</span>}
                </div>

                <div className="form-group-floating">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="phone">Phone Number</label>
                  {errors.phone && <span className="error-hint">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group-floating">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="email">Email Address</label>
                {errors.email && <span className="error-hint">{errors.email}</span>}
              </div>

              <div className="form-group-floating">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  required
                ></textarea>
                <label htmlFor="message">How can we help you?</label>
                {errors.message && <span className="error-hint">{errors.message}</span>}
              </div>

              <button type="submit" className="premium-submit-btn">
                Send Message
                <span className="btn-shine"></span>
              </button>
            </form>
          </div>
        </div>

        {/* Full Width Map Section */}
        <div className="modern-map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.626693325155!2d78.45839467501601!3d25.650512477421888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3977126cebeb8701%3A0x28bebdbf30b58dbe!2sBachpan...a%20play%20school%2C%20Datia!5e0!3m2!1sen!2sin!4v1740987537012!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="School Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
