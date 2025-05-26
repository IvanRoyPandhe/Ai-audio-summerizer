import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      title: 'Smart Summarization',
      description: 'Advanced AI algorithms convert speech to concise, accurate text summaries.',
      highlight: 'Up to 95% accuracy'
    },
    {
      title: 'Real-time Processing',
      description: 'Get instant summaries of your recordings with minimal waiting time.',
      highlight: 'Process 1hr in 2 mins'
    },
    {
      title: 'Key Points Extraction',
      description: 'Automatically identifies and extracts crucial information from lectures.',
      highlight: 'Smart detection'
    },
    {
      title: 'Custom Notes',
      description: 'Generate structured notes with headings, bullet points, and highlights.',
      highlight: 'Organized format'
    },
    {
      title: 'Multiple Languages',
      description: 'Support for various languages and automatic language detection.',
      highlight: '20+ languages'
    },
    {
      title: 'Easy Export',
      description: 'Export your summaries in multiple formats including PDF, Word, and Markdown.',
      highlight: 'Universal compatibility'
    }
  ];

  return (
    <section id="features" className="features">
      <div className="features-container">
        <div className="features-header">
          <h2>Powerful Features</h2>
          <p>Transform your learning experience with our advanced AI capabilities</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-number">{index + 1}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-highlight">{feature.highlight}</span>
            </div>
          ))}
        </div>

        <div className="features-cta">
          <div className="cta-card">
            <h3>Ready to Transform Your Learning?</h3>
            <p>Join thousands of students already using AudioAI</p>
            <button className="cta-button">Get Started Free</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
