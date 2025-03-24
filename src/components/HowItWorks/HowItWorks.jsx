import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Record Your Audio',
      description: 'Use our high-quality audio recorder to capture your lectures or study sessions.',
      icon: '🎤'
    },
    {
      number: '02',
      title: 'AI Processing',
      description: 'Our advanced AI analyzes your audio, converting speech to text and identifying key points.',
      icon: '🤖'
    },
    {
      number: '03',
      title: 'Smart Summary',
      description: 'Get an organized summary with main topics, key points, and important details.',
      icon: '📝'
    },
    {
      number: '04',
      title: 'Export & Share',
      description: 'Download your summary in various formats or share directly with your study group.',
      icon: '📤'
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="hiw-container">
        <div className="hiw-header">
          <h2>How It Works</h2>
          <p>Simple steps to transform your audio into smart notes</p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="step-connector">
                <svg viewBox="0 0 100 100">
                  <path d="M0,50 Q50,0 100,50" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="demo-section">
          <div className="demo-content">
            <h3>See It In Action</h3>
            <p>Watch how AudioAI transforms a lecture into organized notes</p>
            <button className="demo-button">
              <span className="play-icon">▶</span>
              Watch Demo
            </button>
          </div>
          <div className="demo-video">
            {/* Replace with actual video/animation component */}
            <div className="video-placeholder">
              <span className="play-overlay">▶</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
