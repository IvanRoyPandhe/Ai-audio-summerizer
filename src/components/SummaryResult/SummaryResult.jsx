import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SummaryResult.css';

const SummaryResult = () => {
  const navigate = useNavigate();
  
  // Dummy data for the summary result
  const summaryData = {
    title: "Lecture on Machine Learning Fundamentals",
    date: "May 15, 2023",
    duration: "45:23",
    keyPoints: [
      "Introduction to supervised and unsupervised learning algorithms",
      "Explanation of regression vs. classification problems",
      "Overview of common evaluation metrics for ML models",
      "Discussion of overfitting and techniques to prevent it",
      "Practical applications of machine learning in various industries"
    ],
    summary: `This lecture covered the fundamental concepts of machine learning, starting with the distinction between supervised and unsupervised learning. The professor explained how supervised learning uses labeled data to make predictions, while unsupervised learning identifies patterns in unlabeled data.

The lecture then explored different types of problems that machine learning can solve, with particular focus on regression (predicting continuous values) and classification (categorizing into discrete classes). Several algorithms were discussed including linear regression, logistic regression, decision trees, and support vector machines.

A significant portion of the lecture was dedicated to model evaluation, covering metrics such as accuracy, precision, recall, F1-score for classification problems, and MSE, RMSE, and R-squared for regression problems.

The professor emphasized the importance of avoiding overfitting by using techniques like cross-validation, regularization, and ensuring proper train-test splits. The lecture concluded with real-world applications of machine learning across healthcare, finance, and transportation sectors.`,
    topics: [
      { name: "Supervised Learning", confidence: 92 },
      { name: "Classification", confidence: 88 },
      { name: "Model Evaluation", confidence: 85 },
      { name: "Overfitting", confidence: 78 },
      { name: "Practical Applications", confidence: 75 }
    ]
  };

  return (
    <div className="summary-result-page">
      <div className="summary-nav">
        <div className="logo-container">
          <div className="logo-icon">
            <div className="ai-circle"></div>
          </div>
          <span className="logo-text">
            Audio<span className="logo-highlight">AI</span>
          </span>
        </div>
        <button className="back-button" onClick={() => navigate('/record')}>
          Back to Recorder
        </button>
      </div>
      
      <div className="summary-result-container">
        <div className="summary-header">
          <h2>{summaryData.title}</h2>
          <div className="summary-meta">
            <div className="meta-item">
              <span className="meta-label">Date:</span> {summaryData.date}
            </div>
            <div className="meta-item">
              <span className="meta-label">Duration:</span> {summaryData.duration}
            </div>
          </div>
        </div>

        <div className="summary-content">
          <div className="summary-section key-points">
            <h3>Key Points</h3>
            <ul>
              {summaryData.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="summary-section full-summary">
            <h3>Full Summary</h3>
            <div className="summary-text">
              {summaryData.summary.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="summary-section topics">
            <h3>Main Topics</h3>
            <div className="topics-list">
              {summaryData.topics.map((topic, index) => (
                <div className="topic-item" key={index}>
                  <div className="topic-name">{topic.name}</div>
                  <div className="topic-bar-container">
                    <div 
                      className="topic-bar" 
                      style={{ width: `${topic.confidence}%` }}
                    ></div>
                    <span className="topic-percentage">{topic.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="summary-actions">
          <button className="action-button primary">
            Download PDF
          </button>
          <button className="action-button">
            Copy to Clipboard
          </button>
          <button className="action-button">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryResult;