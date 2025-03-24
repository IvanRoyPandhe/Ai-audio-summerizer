import React from 'react';
import { Link } from 'react-router-dom';
import './History.css';

const History = () => {
  // This would normally come from your state management or API
  const mockHistory = [
    {
      id: 1,
      title: "Introduction to Neural Networks",
      date: "2024-01-15",
      duration: "45:30",
      summary: {
        keyPoints: [
          "Basic neural network architecture",
          "Activation functions",
          "Backpropagation algorithm"
        ],
        fullText: "This lecture covered the fundamentals of neural networks..."
      }
    },
    {
      id: 2,
      title: "Advanced Data Structures",
      date: "2024-01-14",
      duration: "52:15",
      summary: {
        keyPoints: [
          "Red-Black Trees",
          "B+ Trees",
          "Hash Tables optimization"
        ],
        fullText: "Detailed discussion about advanced data structures..."
      }
    },
    // Add more mock data as needed
  ];

  return (
    <div className="history-page">
      <div className="history-container">
        <div className="history-header">
          <Link to="/" className="back-button">
            <span>←</span> Back to Home
          </Link>
          <h1>Recording History</h1>
          <p>Your previous lecture summaries</p>
        </div>

        <div className="history-content">
          {mockHistory.map((recording) => (
            <div key={recording.id} className="history-card">
              <div className="history-card-header">
                <h2>{recording.title}</h2>
                <div className="recording-meta">
                  <span className="recording-date">
                    <span className="icon">📅</span> {recording.date}
                  </span>
                  <span className="recording-duration">
                    <span className="icon">⏱️</span> {recording.duration}
                  </span>
                </div>
              </div>

              <div className="summary-section">
                <h3>Key Points</h3>
                <ul className="key-points-list">
                  {recording.summary.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="card-actions">
                <button className="action-button view">
                  <span className="icon">📖</span> View Full Summary
                </button>
                <button className="action-button download">
                  <span className="icon">⬇️</span> Download PDF
                </button>
                <button className="action-button delete">
                  <span className="icon">🗑️</span> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
