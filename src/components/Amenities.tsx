import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const amenities = [
  {
    id: 1,
    title: 'Serenity Spa',
    description: 'Rejuvenate your senses with holistic treatments and ancient healing therapies.',
    image: '/images/spa.png'
  },
  {
    id: 2,
    title: 'Michelin Dining',
    description: 'Savor world-class culinary experiences curated by our master chefs.',
    image: '/images/dining.png'
  },
  {
    id: 3,
    title: 'Infinity Pool',
    description: 'Swim amidst the clouds with panoramic views of the horizon.',
    image: '/images/infinity_pool.png'
  },
  {
    id: 4,
    title: 'Private Chauffeur',
    description: 'Arrive in style with our fleet of luxury vehicles and dedicated drivers.',
    image: '/images/chauffeur.png'
  }
];

export const Amenities: React.FC = () => {
  return (
    <section id="amenities" className="amenities-section">
      <div className="container">
        <div className="section-header">
          <motion.h4 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            EXCEPTIONAL FACILITIES
          </motion.h4>
          <motion.h2 
            className="section-title text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            World-Class <span className="gold-text">Amenities</span>
          </motion.h2>
        </div>

        <div className="amenities-grid">
          {amenities.map((item, index) => (
            <motion.div 
              className="amenity-card glass-panel"
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="amenity-image-wrapper">
                <Image src={item.image} alt={item.title} className="amenity-image" fill sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="amenity-content">
                <h3 className="amenity-title">{item.title}</h3>
                <p className="amenity-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
