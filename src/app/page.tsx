"use client";

import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import dynamic from 'next/dynamic';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';

const About = dynamic(() => import('../components/About').then(mod => mod.About), { ssr: false });
const Amenities = dynamic(() => import('../components/Amenities').then(mod => mod.Amenities), { ssr: false });
const Rooms = dynamic(() => import('../components/Rooms').then(mod => mod.Rooms), { ssr: false });
const Gallery = dynamic(() => import('../components/Gallery').then(mod => mod.Gallery), { ssr: false });
const BookingModal = dynamic(() => import('../components/BookingModal').then(mod => mod.BookingModal), { ssr: false });

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <Navbar onBookClick={() => setIsModalOpen(true)} />
      
      <main>
        <Hero />
        <About />
        <Amenities />
        <Rooms />
        <Gallery />
      </main>

      <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Cinzel', color: 'var(--primary-color)', marginBottom: '1rem' }}>POINT OF DEV</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>© 2026 Point of Dev Hotel. All rights reserved.</p>
        </div>
      </footer>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
