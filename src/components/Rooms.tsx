import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const rooms = [
  {
    id: 1,
    title: 'Ocean View Suite',
    description: 'A masterpiece of contemporary design overlooking the infinite horizon.',
    image: '/images/ocean_suite.png',
    price: '$1,200 / night'
  },
  {
    id: 2,
    title: 'Penthouse Sanctuary',
    description: 'The ultimate luxury experience with panoramic views and private pool.',
    image: '/images/penthouse_pool.png',
    price: '$3,500 / night'
  },
  {
    id: 3,
    title: 'Garden Villa',
    description: 'Immerse yourself in nature within a beautifully appointed private villa.',
    image: '/images/garden_villa.png',
    price: '$850 / night'
  }
];

export const Rooms: React.FC = () => {
  return (
    <section id="rooms" className="rooms-section">
      <div className="container">
        <div className="section-header">
          <motion.h4 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            OUR SUITES
          </motion.h4>
          <motion.h2 
            className="section-title text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Elevated <span className="gold-text">Living</span>
          </motion.h2>
        </div>

        <div className="rooms-grid">
          {rooms.map((room, index) => (
            <motion.div 
              className="room-card card-3d-wrapper"
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="room-card-inner card-3d-inner">
                <div className="room-image-container">
                  <Image src={room.image} alt={room.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="room-image" />
                  <div className="room-price">{room.price}</div>
                </div>
                <div className="room-info glass-panel">
                  <h3 className="room-title">{room.title}</h3>
                  <p className="room-description">{room.description}</p>
                  <button className="btn-secondary">
                    Explore Suite <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
