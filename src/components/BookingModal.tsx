import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Calendar, Users, BedDouble, Star } from 'lucide-react';
import { format } from 'date-fns';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(step + 1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Success step
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div 
            className="booking-split"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="booking-image-side">
              <Image src="/images/ocean_suite.png" alt="Point of Dev Hotel View" fill style={{objectFit: 'cover'}} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="modal-content">
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>

            <div className="modal-body">
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="booking-step"
                >
                  <h2 className="modal-title">Check Availability</h2>
                  <p className="modal-subtitle">Reserve your sanctuary</p>
                  
                  <div className="form-group">
                    <label>Check-in & Check-out</label>
                    <div className="date-inputs">
                      <div className="input-with-icon">
                        <Calendar size={18} />
                        <input type="date" className="glass-input" defaultValue={format(new Date(), 'yyyy-MM-dd')} />
                      </div>
                      <span>to</span>
                      <div className="input-with-icon">
                        <Calendar size={18} />
                        <input type="date" className="glass-input" defaultValue={format(new Date(Date.now() + 86400000), 'yyyy-MM-dd')} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Guests</label>
                    <div className="input-with-icon">
                      <Users size={18} />
                      <select className="glass-input">
                        <option value="1">1 Adult</option>
                        <option value="2">2 Adults</option>
                        <option value="3">3 Adults</option>
                        <option value="4">4 Adults</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Room Suite</label>
                    <div className="input-with-icon">
                      <BedDouble size={18} />
                      <select className="glass-input">
                        <option value="ocean">Ocean View Suite</option>
                        <option value="penthouse">Penthouse Sanctuary</option>
                        <option value="garden">Garden Villa</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Experience Package</label>
                    <div className="input-with-icon">
                      <Star size={18} />
                      <select className="glass-input">
                        <option value="standard">Room Only</option>
                        <option value="breakfast">Bed & Michelin Breakfast</option>
                        <option value="spa">All-Inclusive Spa & Wellness</option>
                        <option value="romance">Ultimate Romance Retreat</option>
                      </select>
                    </div>
                  </div>

                  <button className="btn-primary full-width" onClick={handleNext}>Check Availability</button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="booking-step"
                >
                  <h2 className="modal-title">Guest Details</h2>
                  <p className="modal-subtitle">Almost there</p>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" className="glass-input" placeholder="John Doe" required />
                    </div>
                    
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" className="glass-input" placeholder="john@example.com" required />
                    </div>
                    
                    <div className="form-group">
                      <label>Special Requests</label>
                      <textarea className="glass-input" rows={3} placeholder="Any specific requirements..."></textarea>
                    </div>
                    
                    <div className="modal-actions">
                      <button type="button" className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                      <button type="submit" className="btn-primary">Confirm Booking</button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="booking-step success-step"
                >
                  <div className="success-icon">✓</div>
                  <h2 className="modal-title">Booking Confirmed</h2>
                  <p className="modal-subtitle">We look forward to welcoming you to Point of Dev.</p>
                  <p className="success-message">A confirmation email has been sent to your address.</p>
                  <button className="btn-primary mt-4" onClick={onClose}>Close</button>
                </motion.div>
              )}
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
