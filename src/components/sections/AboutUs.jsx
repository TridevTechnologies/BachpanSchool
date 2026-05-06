import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaLightbulb, FaHistory, FaCheckCircle } from 'react-icons/fa';
import '../styles/AboutUs.css';

function AboutUs() {
  const milestones = [
    {
      year: "2013",
      title: "Bachpan Play School",
      description: "Began its journey with a pre-school, providing a strong foundation for early learning.",
    },
    {
      year: "2015",
      title: "Academic Heights Public School",
      description: "Expanded into a formal school, offering quality education with a focus on holistic development.",
    },
    {
      year: "2024",
      title: "ICSE Affiliation",
      description: "Achieved a significant milestone by becoming an ICSE-affiliated school.",
    },
    {
      year: "Today",
      title: "Continued Excellence",
      description: "Providing quality education, blending innovation, values, and global standards to nurture future leaders.",
    },
  ];

  return (
    <section className="about-modern-section" id="about">
      {/* Premium Hero Header (Matching Fee Page) */}
      <div className="about-hero-header">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="about-hero-content"
        >
          <span className="badge-premium">Our Story</span>
          <h1>Building a Foundation of <br/><span>Excellence Since 2013</span></h1>
        </motion.div>
      </div>

      <div className="about-main-container">
        {/* Mission & Vision Overlay Cards */}
        <div className="vision-mission-row">
          <motion.div 
            className="modern-info-card mission-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="icon-box"><FaBullseye /></div>
            <h2>Our Mission</h2>
            <p>To Educate, Empower, and Excel. We strive to nurture the unique potential of every child by providing a safe, supportive, and stimulating learning environment. We aim to foster both academic excellence and social growth, ensuring that every student thrives with confidence and curiosity.</p>
          </motion.div>

          <motion.div 
            className="modern-info-card vision-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="icon-box"><FaLightbulb /></div>
            <h2>Our Vision</h2>
            <p>To provide world-class quality education in Datia, blending innovation, technology, and values to nurture confident and competent global citizens.</p>
          </motion.div>
        </div>

        {/* Vertical Premium Timeline */}
        <div className="timeline-wrapper">
          <div className="timeline-header">
            <h2>Our Journey</h2>
            <p>A decade of commitment and growth</p>
          </div>
          
          <div className="premium-timeline">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="timeline-marker">
                  <div className="marker-dot"><FaCheckCircle /></div>
                  <div className="marker-line"></div>
                </div>
                <div className="timeline-info">
                  <span className="timeline-year">{milestone.year}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;