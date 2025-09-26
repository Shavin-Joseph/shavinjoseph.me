import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCode, FaPaintBrush, FaRocket } from 'react-icons/fa';
import { pageVariants, pageTransition } from '../animations';
import AnimatedBackground from '../components/AnimatedBackground';
import './Home.css';

// Custom hook to track mouse position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

const Home = () => {
  const { x, y } = useMousePosition();
  const parallaxStrength = 25;
  const xOffset = (x - window.innerWidth / 2) / parallaxStrength;
  const yOffset = (y - window.innerHeight / 2) / parallaxStrength;

  const heroTitle = "Architect of Digital Experiences";
  const titleWords = heroTitle.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div className="container" style={{ x: -xOffset, y: -yOffset }}>
          <motion.h1 
            className="hero-title"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {titleWords.map((word, index) => (
              <motion.span key={index} variants={wordVariants} style={{ display: 'inline-block', marginRight: '1rem' }}>
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
            I’m Shavin Joseph, a developer and designer passionate about creating intuitive, powerful, and beautiful software.
          </motion.p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="container services-section">
        <h2 className="section-title">What I Bring to the Table</h2>
        <div className="services-grid">
           {/* Card 1 */}
           <motion.div className="service-card" whileHover={{ y: -10, boxShadow: '0 0 25px rgba(0, 198, 255, 0.2)' }} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5}}>
            <FaCode className="service-icon" />
            <h3>Development</h3>
            <p>Building scalable and robust web applications with clean code and modern architecture.</p>
          </motion.div>
          {/* Card 2 */}
          <motion.div className="service-card" whileHover={{ y: -10, boxShadow: '0 0 25px rgba(0, 198, 255, 0.2)' }} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5, delay: 0.2}}>
            <FaPaintBrush className="service-icon" />
            <h3>UI/UX Design</h3>
            <p>Designing user-centric interfaces that are not only beautiful but also intuitive and accessible.</p>
          </motion.div>
           {/* Card 3 */}
          <motion.div className="service-card" whileHover={{ y: -10, boxShadow: '0 0 25px rgba(0, 198, 255, 0.2)' }} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5, delay: 0.4}}>
            <FaRocket className="service-icon" />
            <h3>Graphic Design</h3>
            <p>Creating compelling visuals, from posters to social media graphics, that tell a story.</p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;