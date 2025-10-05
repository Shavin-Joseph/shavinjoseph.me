import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="header">
      <nav className="navbar container">
        <NavLink to="/" className="nav-logo" onClick={closeMobileMenu}>
          Shavin Joseph
        </NavLink>

        {/* Desktop Menu */}
        <div className="nav-menu-desktop">
          <NavLink to="/" className="nav-item" end>Home</NavLink>
          <NavLink to="/about" className="nav-item">About</NavLink>
          <NavLink to="/work" className="nav-item">Work</NavLink>
          <NavLink to="/templates" className="nav-item">Templates</NavLink>
          <NavLink to="/contact" className="nav-item-button">Let's Talk</NavLink>
        </div>

        {/* Mobile Menu Icon */}
        <div className="nav-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile Menu Overlay */}
        <div className={isMobileMenuOpen ? "nav-menu-mobile active" : "nav-menu-mobile"}>
          <NavLink to="/" className="nav-item-mobile" onClick={closeMobileMenu}>Home</NavLink>
          <NavLink to="/about" className="nav-item-mobile" onClick={closeMobileMenu}>About</NavLink>
          <NavLink to="/work" className="nav-item-mobile" onClick={closeMobileMenu}>Work</NavLink>
          <NavLink to="/templates" className="nav-item-mobile" onClick={closeMobileMenu}>Templates</NavLink>
          <NavLink to="/contact" className="nav-item-mobile-button" onClick={closeMobileMenu}>Let's Talk</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;