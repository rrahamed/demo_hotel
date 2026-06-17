import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        <div className="about-grid">
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <div className="image-reveal">
              <Image 
                src="/images/gallery3.png" 
                alt="Hotel Exterior" 
                className="about-image"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h4 className="section-subtitle">THE VISION</h4>
            <h2 className="section-title">Redefining <span className="gold-text">Modern</span> Luxury</h2>
            <p className="section-text">
              Point of Dev Hotel is more than a destination; it is an architectural masterpiece designed to harmonize with nature while providing state-of-the-art comforts. Every angle, every texture, and every beam of light is curated to elevate your senses.
            </p>
            <p className="section-text">
              Step into a world where contemporary design meets timeless elegance. Our sanctuary offers an unparalleled escape from the ordinary, where every moment is a celebration of refined living.
            </p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">15</span>
                <span className="stat-label">Acre Estate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">120</span>
                <span className="stat-label">Signature Suites</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Michelin Venues</span>
              </div>
            </div>
            
            <button className="btn-primary mt-4 explore-btn">
              Discover More <span className="arrow">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
