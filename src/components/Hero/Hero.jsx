import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Transform Your 
          <span className="hero-title-highlight"> Lectures</span>
          <br />
          Into Smart Notes
        </h1>
        <p className="hero-description">
          Record your lectures, meetings, or study sessions and get instant AI-powered summaries. 
          Save time and enhance your learning with smart audio analysis.
        </p>
        <div className="hero-actions">
          <Link to="/record" className="hero-button primary">
            <span className="button-icon">🎙️</span>
            Start Recording
          </Link>
          <a href="#how-it-works" className="hero-button secondary">
            <span className="button-icon">📖</span>
            How It Works
          </a>
        </div>
      </div>
      <div className="hero-features">
        <div className="feature-card">
          <span className="feature-icon">🎙️</span>
          <h3>Record Audio</h3>
          <p>High-quality recording from any device</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🤖</span>
          <h3>AI Analysis</h3>
          <p>Advanced speech recognition & summarization</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📝</span>
          <h3>Smart Summary</h3>
          <p>Get key points and organized notes</p>
        </div>
      </div>
      <div className="hero-background">
        <div className="gradient-blur"></div>
        <div className="animated-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="grid-overlay"></div>
      </div>
      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number">98%</span>
          <span className="stat-label">Accuracy Rate</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50K+</span>
          <span className="stat-label">Students Helped</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">AI Support</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
