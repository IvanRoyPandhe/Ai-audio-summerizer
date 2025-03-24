import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Add useLocation
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation(); // Add this to track current route

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <div className="ai-circle"></div>
          </div>
          <span className="logo-text">
            Audio<span className="logo-highlight">AI</span>
          </span>
        </Link>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setActiveSection('home')}
          >
            <span className="nav-icon">🏠</span>
            Home
          </Link>
         
          <a 
            href="#features" 
            className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
            onClick={() => setActiveSection('features')}
          >
            <span className="nav-icon">⚡</span>
            Features
          </a>
          <a 
            href="#how-it-works" 
            className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
            onClick={() => setActiveSection('how-it-works')}
          >
            <span className="nav-icon">🔍</span>
            How It Works
          </a>
          <a 
            href="#pricing" 
            className={`nav-link ${activeSection === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveSection('pricing')}
          >
            <span className="nav-icon">💎</span>
            Pricing
          </a>
          <Link 
            to="/history" 
            className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
            onClick={() => setActiveSection('history')}
          >
            <span className="nav-icon">📚</span>
            History
          </Link>
        </div>

        <div className="nav-actions">
          <button className="theme-toggle" aria-label="Toggle theme">
            <div className="toggle-track">
              <span className="toggle-icon">🌙</span>
            </div>
          </button>
          <Link to="/record" className="try-button">
            Try Now
            <span className="button-glow"></span>
          </Link>
          <button 
            className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
