import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation'; // Import the typing animation component
import { FaCode, FaPaintBrush, FaRocket } from 'react-icons/fa';
import { pageVariants, pageTransition } from '../animations';
import AnimatedBackground from '../components/AnimatedBackground';
import './Home.css';

const Home = () => {
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <title>Shavin Joseph | Digital Architect & Creative Developer</title>
      <meta name="description" content="The professional portfolio of Shavin Joseph, a developer and designer specializing in creating intuitive, powerful, and beautiful software." />
      <link rel="canonical" href="https://shavinjoseph.me" />
      {/* ------------------------------------ */}
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="hero-title">
              <span className="hero-intro-text">I Build & Design</span>
              <TypeAnimation
                sequence={[
                  'Elegant Code.',
                  2000,
                  'Intuitive UI/UX.',
                  2000,
                  'Digital Solutions.',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="hero-dynamic-text"
                repeat={Infinity}
              />
            </h1>
          </motion.div>
          
          <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            Hi, I'm Shavin Joseph. I specialize in bridging the gap between ambitious ideas and their digital execution, delivering software that is as elegant as it is effective.
          </motion.p>
        </div>
      </section>

      {/* Services Section (remains the same) */}
      <section className="container services-section">
        <h2 className="section-title">What I Bring to the Table</h2>
        <div className="services-grid">
           <motion.div className="service-card" whileHover={{ y: -10, boxShadow: '0 0 25px rgba(0, 198, 255, 0.2)' }} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5}}>
            <FaCode className="service-icon" />
            <h3>Development</h3>
            <p>Building scalable and robust web applications with clean code and modern architecture.</p>
          </motion.div>
          <motion.div className="service-card" whileHover={{ y: -10, boxShadow: '0 0 25px rgba(0, 198, 255, 0.2)' }} initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.5}} transition={{duration: 0.5, delay: 0.2}}>
            <FaPaintBrush className="service-icon" />
            <h3>UI/UX Design</h3>
            <p>Designing user centric interfaces that are not only beautiful but also intuitive and accessible.</p>
          </motion.div>
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