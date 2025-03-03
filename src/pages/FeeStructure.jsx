import React, { useState } from 'react';
import EnrollmentForm from '../components/shared/EnrollmentForm';
import '../components/styles/FeeStructure.css';

function FeeStructure() {
  const [isEnrollmentFormOpen, setIsEnrollmentFormOpen] = useState(false);

  const feeStructure = [
    { grade: "P.C.", annualFee: "₹18,000", admissionFee: "₹6,000", feePerInstallment: "₹4,500", siblingDiscount: "₹1,600" },
    { grade: "Nursery", annualFee: "₹19,600", admissionFee: "₹6,000", feePerInstallment: "₹4,900", siblingDiscount: "₹1,760" },
    { grade: "K.G.-1", annualFee: "₹20,800", admissionFee: "₹6,000", feePerInstallment: "₹5,200", siblingDiscount: "₹1,880" },
    { grade: "K.G.-II", annualFee: "₹22,000", admissionFee: "₹6,000", feePerInstallment: "₹5,500", siblingDiscount: "₹2,000" },
    { grade: "I", annualFee: "₹26,800", admissionFee: "₹6,000", feePerInstallment: "₹6,700", siblingDiscount: "₹2,440" },
    { grade: "II", annualFee: "₹28,000", admissionFee: "₹6,000", feePerInstallment: "₹7,000", siblingDiscount: "₹2,560" },
    { grade: "III", annualFee: "₹28,000", admissionFee: "₹6,000", feePerInstallment: "₹7,000", siblingDiscount: "₹2,560" },
    { grade: "IV", annualFee: "₹28,000", admissionFee: "₹6,000", feePerInstallment: "₹7,000", siblingDiscount: "₹2,560" },
    { grade: "V", annualFee: "₹29,200", admissionFee: "₹6,000", feePerInstallment: "₹7,300", siblingDiscount: "₹2,680" },
    { grade: "VI", annualFee: "₹29,200", admissionFee: "₹7,000", feePerInstallment: "₹7,300", siblingDiscount: "₹2,680" },
    { grade: "VII", annualFee: "₹29,200", admissionFee: "₹7,000", feePerInstallment: "₹7,300", siblingDiscount: "₹2,680" },
    { grade: "VIII", annualFee: "₹30,000", admissionFee: "₹7,000", feePerInstallment: "₹7,500", siblingDiscount: "₹2,760" },
    { grade: "IX", annualFee: "₹36,000", admissionFee: "₹7,000", feePerInstallment: "₹9,000", siblingDiscount: "₹3,360" },
    { grade: "X", annualFee: "₹36,000", admissionFee: "₹7,000", feePerInstallment: "₹9,000", siblingDiscount: "₹3,360" },
  ];

  return (
    <div className="fee-structure-page">
      <EnrollmentForm isOpen={isEnrollmentFormOpen} onClose={() => setIsEnrollmentFormOpen(false)} />
      
      <div className="fee-header">
        <h1>Fee Structure 2025-26</h1>
        <p>Transparent and competitive fees for quality education</p>
      </div>

      <div className="container">
        <div className="fee-table-container">
          <table className="fee-table">
            <thead>
              <tr>
                <th>Grade Level</th>
                <th>Annual Fee</th>
                <th>Admission Fee</th>
                <th>Fee/Installment</th>
                <th>Sibling Discount</th>
              </tr>
            </thead>
            <tbody>
              {feeStructure.map((item, index) => (
                <tr key={index}>
                  <td>{item.grade}</td>
                  <td>{item.annualFee}</td>
                  <td>{item.admissionFee}</td>
                  <td>{item.feePerInstallment}</td>
                  <td>{item.siblingDiscount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fee-note">
          <h2>Note:</h2>
          <p>➤ School fee as per installment (for the given academic session) is to be deposited up to 15th of the month of: April, July, October, and January.</p>
          <p>➤ Sibling Discount will be given in the last installment of the fee.</p>
          <p>➤ ICSE Registration fee will be charged separately for Class IX and ICSE Examination Fee will be charged separately for Class X as per Council norms.</p>
          <p>➤ Late fee will be charged for each installment after given scheduled dates.</p>
        </div>
      </div>
    </div>
  );
}

export default FeeStructure;