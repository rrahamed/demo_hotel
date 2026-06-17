import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-container">
        <div className="logo">
          <h2>POINT OF DEV</h2>
          <span>HOTEL & RESORT</span>
        </div>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#rooms" onClick={() => setMenuOpen(false)}>Suites</a>
          <a href="#dining" onClick={() => setMenuOpen(false)}>Dining</a>
          <a href="#spa" onClick={() => setMenuOpen(false)}>Wellness</a>
        </div>

        <div className="nav-actions">
          <button className="btn-primary nav-book-btn" onClick={onBookClick}>
            Book Now
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
