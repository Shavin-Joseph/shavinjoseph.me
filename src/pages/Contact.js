import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../animations';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <div className="container contact-container">
        <h1 className="page-title">Let's Create Together</h1>
        <p className="page-subtitle">Have a project idea, a job opportunity, or just want to connect? My inbox is always open.</p>
        
        <div className="contact-options">
          <motion.a href="mailto:youremail@example.com" className="contact-card" whileHover={{ y: -5 }}>
            <FaEnvelope />
            <h3>Email Me</h3>
            <p>youremail@example.com</p>
          </motion.a>
          <motion.a href="#" className="contact-card" whileHover={{ y: -5 }}>
            <FaLinkedin />
            <h3>LinkedIn</h3>
            <p>Connect with me</p>
          </motion.a>
          <motion.a href="#" className="contact-card" whileHover={{ y: -5 }}>
            <FaGithub />
            <h3>GitHub</h3>
            <p>See my code</p>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;