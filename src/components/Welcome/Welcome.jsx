import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = ({ onContinue }) => {
  const [activeTab, setActiveTab] = useState('features');
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-header">
          <div className="logo-icon-small">
            <div className="ai-circle-small"></div>
          </div>
          <h1 className="welcome-title">
            Audio<span className="logo-highlight">AI</span>
          </h1>
          <p className="welcome-tagline">Transform Your Lectures Into Smart Notes</p>
        </div>

        <div className="welcome-tabs">
          <button 
            className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={`tab-button ${activeTab === 'how-it-works' ? 'active' : ''}`}
            onClick={() => setActiveTab('how-it-works')}
          >
            How It Works
          </button>
          <button 
            className={`tab-button ${activeTab === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveTab('pricing')}
          >
            Pricing
          </button>
        </div>

        {activeTab === 'features' && (
          <div className="welcome-tab-content">
            <div className="welcome-features">
              <div className="welcome-feature">
                <span className="feature-icon">🎙️</span>
                <div className="feature-text">
                  <h3>Record Anywhere</h3>
                  <p>Capture high-quality audio from any device, even in noisy environments with our advanced noise cancellation</p>
                </div>
              </div>
              
              <div className="welcome-feature">
                <span className="feature-icon">🤖</span>
                <div className="feature-text">
                  <h3>AI-Powered Analysis</h3>
                  <p>Advanced speech recognition & summarization with support for multiple languages and technical terminology</p>
                </div>
              </div>
              
              <div className="welcome-feature">
                <span className="feature-icon">📝</span>
                <div className="feature-text">
                  <h3>Smart Summaries</h3>
                  <p>Get key points, organized notes, and highlighted important concepts instantly after recording</p>
                </div>
              </div>

              <div className="welcome-feature">
                <span className="feature-icon">🔄</span>
                <div className="feature-text">
                  <h3>Sync Across Devices</h3>
                  <p>Access your recordings and notes from any device with cloud synchronization</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'how-it-works' && (
          <div className="welcome-tab-content">
            <div className="how-it-works-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Record Your Audio</h3>
                  <p>Use our simple recorder to capture lectures, meetings, or study sessions</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>AI Processing</h3>
                  <p>Our advanced AI transcribes and analyzes your recording in real-time</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Get Your Summary</h3>
                  <p>Review an organized summary with key points, topics, and action items</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Edit & Share</h3>
                  <p>Customize your notes and share them with classmates or colleagues</p>
                </div>
              </div>
            </div>
            <div className="demo-section">
              <button className="demo-button" onClick={() => setShowDemo(!showDemo)}>
                {showDemo ? 'Hide Demo' : 'Watch Demo'}
              </button>
              {showDemo && (
                <div className="demo-video">
                  <div className="video-placeholder">
                    <div className="play-icon">▶</div>
                    <p>Demo Video</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="welcome-tab-content">
            <div className="pricing-plans">
              <div className="pricing-plan">
                <div className="plan-header">
                  <h3>Free</h3>
                  <p className="plan-price">$0<span>/month</span></p>
                </div>
                <ul className="plan-features">
                  <li>5 recordings per month</li>
                  <li>Basic summaries</li>
                  <li>7-day history</li>
                  <li>Standard quality audio</li>
                </ul>
                <button className="plan-button" onClick={onContinue}>Get Started</button>
              </div>
              
              <div className="pricing-plan featured">
                <div className="plan-badge">Popular</div>
                <div className="plan-header">
                  <h3>Pro</h3>
                  <p className="plan-price">$9.99<span>/month</span></p>
                </div>
                <ul className="plan-features">
                  <li>Unlimited recordings</li>
                  <li>Advanced AI summaries</li>
                  <li>Unlimited history</li>
                  <li>High quality audio</li>
                  <li>Priority support</li>
                </ul>
                <button className="plan-button featured" onClick={onContinue}>Try Pro</button>
              </div>
              
              <div className="pricing-plan">
                <div className="plan-header">
                  <h3>Team</h3>
                  <p className="plan-price">$24.99<span>/month</span></p>
                </div>
                <ul className="plan-features">
                  <li>Everything in Pro</li>
                  <li>5 team members</li>
                  <li>Shared recordings</li>
                  <li>Collaborative notes</li>
                  <li>Admin controls</li>
                </ul>
                <button className="plan-button" onClick={onContinue}>Contact Sales</button>
              </div>
            </div>
          </div>
        )}

        <div className="welcome-actions">
          <button onClick={onContinue} className="welcome-button primary">
            Sign In
          </button>
          <button onClick={onContinue} className="welcome-button secondary">
            Create Account
          </button>
        </div>

        <div className="welcome-testimonials">
          <h3 className="testimonials-title">What Our Users Say</h3>
          <div className="testimonials-container">
            <div className="testimonial">
              <div className="testimonial-content">
                "AudioAI has completely transformed how I take notes in my medical lectures. The summaries are incredibly accurate!"
              </div>
              <div className="testimonial-author">- Sarah K., Medical Student</div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "I use this for all my business meetings. The time it saves me is worth every penny of the subscription."
              </div>
              <div className="testimonial-author">- Michael T., Product Manager</div>
            </div>
          </div>
        </div>

        <div className="welcome-footer">
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
      </div>
      
      <div className="welcome-background">
        <div className="gradient-blur"></div>
        <div className="animated-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="grid-overlay"></div>
      </div>
    </div>
  );
};

export default Welcome;