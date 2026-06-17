import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  '/images/gallery1.png',
  '/images/gallery2.png',
  '/images/gallery3.png',
  '/images/gallery4.png',
  '/images/gallery5.png',
  '/images/ocean_suite.png'
];

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header">
          <motion.h4 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            A GLIMPSE OF PARADISE
          </motion.h4>
          <motion.h2 
            className="section-title text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The <span className="gold-text">Gallery</span>
          </motion.h2>
        </div>

        <div className="gallery-grid">
          {images.map((img, index) => (
            <motion.div 
              className={`gallery-item ${index === 0 || index === 3 ? 'large' : ''}`}
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <Image src={img} alt={`Gallery image ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="gallery-image" />
              <div className="gallery-overlay">
                <span>View Image</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
