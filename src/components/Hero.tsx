import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply spring physics to make the scrolling ultra-smooth
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001
  });

  // Fade out text as we scroll
  const opacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  
  // The 'Best Scrolling Feeling': The video plays smoothly on its own at 60FPS. 
  // We use scroll *only* to control its 3D spatial shape and position, 
  // completely eliminating the janky frame-decoding jumps of MP4 scrubbing.
  const videoScale = useTransform(smoothProgress, [0, 0.6], [1, 0.5]);
  const videoY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const videoBorderRadius = useTransform(smoothProgress, [0, 0.3], ["0px", "60px"]);
  const videoRotateX = useTransform(smoothProgress, [0, 1], [0, 25]);
  const videoOpacity = useTransform(smoothProgress, [0.7, 1], [1, 0]);

  return (
    <div className="hero-container" ref={containerRef}>
      <div className="sticky-wrapper">
        <motion.div 
          className="hero-video-wrapper"
          style={{
            scale: videoScale,
            y: videoY,
            rotateX: videoRotateX,
            borderRadius: videoBorderRadius,
            opacity: videoOpacity,
            transformPerspective: 1500,
            overflow: "hidden",
            boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.8)",
            willChange: "transform, opacity, border-radius"
          }}
        >
          <div className="hero-overlay"></div>
          <video 
            autoPlay
            loop
            muted 
            playsInline
            className="hero-video"
            preload="auto"
            poster="https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?auto=format&fit=crop&q=80&w=2000"
          >
            <source src="/hotel_video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <motion.div 
          className="hero-content"
          style={{ opacity }}
        >
          <motion.div 
            className="hero-text-wrapper"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h3 className="hero-subtitle">WELCOME TO</h3>
            <h1 className="hero-title">
              <span className="gold-text">POINT OF DEV</span>
              <br />
              HOTEL
            </h1>
            <p className="hero-description">
              Experience the pinnacle of luxury and modern serenity. Where innovation meets the soul.
            </p>
          </motion.div>

          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <span>Scroll to Explore</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
