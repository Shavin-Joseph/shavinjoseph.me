import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

// --- DATA ---
// In a real app, you might fetch this from an API
const projectData = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack web application with user authentication, product catalog, and a shopping cart.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Event Poster Series",
    description: "A series of vibrant posters designed for a university music festival, focusing on typography and color theory.",
    tags: ["Photoshop", "Illustrator", "Graphic Design"],
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1974&auto=format&fit=crop",
    liveLink: "#",
    githubLink: "#",
  }
];

// --- COMPONENT ---
function Projects() {
  return (
    <section id="projects" className="container">
      <h2 className="section-heading">My Work</h2>
      <div className="projects-grid">
        {projectData.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <a href={project.liveLink} className="project-link">View Live</a>
                <a href={project.githubLink} className="project-link">View Code</a>
              </div>
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;