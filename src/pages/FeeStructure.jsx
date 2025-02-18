import React, { useState } from 'react';
import EnrollmentForm from '../components/shared/EnrollmentForm';
import '../components/styles/FeeStructure.css';

function FeeStructure() {
  const [isEnrollmentFormOpen, setIsEnrollmentFormOpen] = useState(false);

  const feeStructure = [
    {
      grade: "Pre-Primary (Nursery - KG)",
      admissionFee: "₹10,000",
      termFee: "₹15,000",
      annualFee: "₹45,000",
    },
    {
      grade: "Primary (Class 1-5)",
      admissionFee: "₹15,000",
      termFee: "₹20,000",
      annualFee: "₹60,000",
    },
    {
      grade: "Middle School (Class 6-8)",
      admissionFee: "₹20,000",
      termFee: "₹25,000",
      annualFee: "₹75,000",
    },
    {
      grade: "Secondary (Class 9-10)",
      admissionFee: "₹25,000",
      termFee: "₹30,000",
      annualFee: "₹90,000",
    },
    {
      grade: "Senior Secondary (Class 11-12)",
      admissionFee: "₹30,000",
      termFee: "₹35,000",
      annualFee: "₹105,000",
    },
  ];

  const additionalFees = [
    {
      item: "Transportation Fee",
      description: "Based on distance (₹2,000 - ₹5,000 per month)",
    },
    {
      item: "Computer Lab Fee",
      description: "₹2,000 per term",
    },
    {
      item: "Science Lab Fee",
      description: "₹2,500 per term (Class 6 onwards)",
    },
    {
      item: "Sports Fee",
      description: "₹1,500 per term",
    },
  ];

  return (
    <div className="fee-structure-page">
      <EnrollmentForm
        isOpen={isEnrollmentFormOpen}
        onClose={() => setIsEnrollmentFormOpen(false)}
      />
      
      <div className="fee-header">
        <h1>Fee Structure 2025-26</h1>
        <p>Investing in your child's future with transparent and competitive fees</p>
      </div>

      <div className="container">
        {/* Main Fee Structure Table */}
        <div className="fee-table-container">
          <table className="fee-table">
            <thead>
              <tr>
                <th>Grade Level</th>
                <th>Admission Fee</th>
                <th>Term Fee</th>
                <th>Annual Fee</th>
              </tr>
            </thead>
            <tbody>
              {feeStructure.map((item, index) => (
                <tr key={index}>
                  <td>{item.grade}</td>
                  <td>{item.admissionFee}</td>
                  <td>{item.termFee}</td>
                  <td>{item.annualFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Fees Section */}
        <div className="additional-fees">
          <h2>Additional Fees</h2>
          <div className="additional-fees-grid">
            {additionalFees.map((fee, index) => (
              <div key={index} className="fee-card">
                <h3>{fee.item}</h3>
                <p>{fee.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Policy Section */}
        <div className="fee-policy">
          <h2>Fee Policy Highlights</h2>
          <div className="policy-points">
            <div className="policy-point">
              <h3>Payment Schedule</h3>
              <p>Fees are payable in three terms: April, August, and December</p>
            </div>
            <div className="policy-point">
              <h3>Early Bird Discount</h3>
              <p>5% discount on term fees if paid within first 10 days</p>
            </div>
            <div className="policy-point">
              <h3>Sibling Discount</h3>
              <p>10% discount on tuition fee for second child onwards</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="fee-cta">
          <h2>Ready to Secure Your Child's Future?</h2>
          <p>Limited seats available for academic year 2025-26</p>
          <button 
            className="enroll-button"
            onClick={() => setIsEnrollmentFormOpen(true)}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeeStructure;
