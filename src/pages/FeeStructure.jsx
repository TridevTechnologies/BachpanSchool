import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaCalendarAlt, FaPercentage, FaSchool, FaUserGraduate, FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import EnrollmentForm from '../components/shared/EnrollmentForm';
import '../components/styles/FeeStructure.css';

function FeeStructure() {
  const [isEnrollmentFormOpen, setIsEnrollmentFormOpen] = useState(false);
  const [feeData, setFeeData] = useState({ headers: [], rows: [] });
  const [sheetTitle, setSheetTitle] = useState("Loading Fee Structure...");
  const [loading, setLoading] = useState(true);

  const SHEET_ID = "1mVMlwpYO9O2ILva8_H9W_r7nMSoEswe5bbc1440p_t8";
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
  const SHEET_PAGE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

  useEffect(() => {
    // 1. Fetch the Sheet Title (via HTML scraping proxy or simple fetch if CORS allowed)
    // For now, we'll try to get it from the CSV first row IF it's formatted as a title, 
    // but the most robust way is to fetch the page metadata.
    fetch(SHEET_PAGE_URL)
      .then(res => res.text())
      .then(html => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const title = doc.title.replace(" - Google Sheets", "");
        if (title) setSheetTitle(title);
      })
      .catch(() => setSheetTitle("Bachpan School Fee Structure"));

    // 2. Fetch the CSV Data
    fetch(CSV_URL)
      .then(res => res.text())
      .then(csvText => {
        const lines = csvText.split('\n').filter(line => line.trim() !== "");
        if (lines.length > 0) {
          const headers = lines[0].split(',').map(h => h.trim());
          const rows = lines.slice(1).map(line => {
            return line.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
          });
          setFeeData({ headers, rows });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching fee data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="fee-loading-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="loader-icon"
        ><FaSchool /></motion.div>
        <p>Fetching Latest Fee Structure...</p>
      </div>
    );
  }

  return (
    <div className="fee-page-wrapper">
      <EnrollmentForm isOpen={isEnrollmentFormOpen} onClose={() => setIsEnrollmentFormOpen(false)} />

      {/* Clean Header */}
      <section className="fee-simple-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-content"
        >
          <h1>{sheetTitle}</h1>
        </motion.div>
      </section>

      {/* Main Table Container */}
      <div className="fee-main-container">
        <motion.div
          className="premium-table-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="table-wrapper">
            <table className="modern-fee-table">
              <thead>
                <tr>
                  {feeData.headers.map((header, idx) => (
                    <th key={idx} className={idx === 0 ? "sticky-col" : "wrap-header"}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {feeData.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={cIdx === 0 ? "grade-name sticky-col" : "amount"}>
                        {cIdx > 0 && !isNaN(cell.replace(/,/g, '')) && cell !== "" ? "₹" : ""}{cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Call to Action */}
          <div className="table-footer-cta">
            <p>Ready to give your child a bright future?</p>
            <button className="btn-large-gold" onClick={() => setIsEnrollmentFormOpen(true)}>
              Enrol Your Child Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FeeStructure;