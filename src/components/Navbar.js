import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="header">
      <nav className="navbar container">
        <NavLink to="/" className="nav-logo">Shavin Joseph</NavLink>
        <div className="nav-menu">
          <NavLink to="/" className="nav-item" end>Home</NavLink>
          <NavLink to="/about" className="nav-item">About</NavLink>
          <NavLink to="/work" className="nav-item">Work</NavLink>
          <NavLink to="/contact" className="nav-item-button">Let's Talk</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;