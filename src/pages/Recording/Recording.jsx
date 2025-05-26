import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Recording.css';

const Recording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const timerInterval = useRef(null);
  const visualizerBars = 30; // Number of visualizer bars

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setAudioBlob(audioBlob);
        audioChunks.current = [];
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      setShowResults(false);
      timerInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      clearInterval(timerInterval.current);
    }
  };

  const handleSubmit = async () => {
    if (!audioBlob) {
      alert('Please record audio first');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 2000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showResults) {
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
          <button className="back-button" onClick={() => setShowResults(false)}>
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
  }

  return (
    <div className="recording-page">
      <div className="ai-orb"></div>
      <div className="recording-container">
        <div className="recording-header">
          <Link to="/" className="back-button">
            <span className="back-icon">←</span>
            <span>Back to Home</span>
          </Link>
          <h1>AI Voice Recording</h1>
          <p>Capture your voice and let AI transform it into smart notes</p>
        </div>

        <div className="recording-main">
          <div className="recorder-card">
            <div className="card-glow"></div>
            <div className="visualization-area">
              {isRecording ? (
                <div className="audio-visualizer">
                  {Array(visualizerBars).fill(null).map((_, i) => (
                    <div 
                      key={i} 
                      className="visualizer-bar"
                      style={{
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="ready-state">
                  <div className="ai-circle-container">
                    <div className="ai-circle">
                      <div className="ai-circle-inner"></div>
                    </div>
                  </div>
                  <p>Ready to Record</p>
                  <span className="ready-subtitle">Click the button below to start</span>
                </div>
              )}
            </div>

            <div className="recording-controls">
              {isRecording && (
                <div className="recording-time">
                  <div className="time-display">
                    <span className="time-icon">⏱️</span>
                    {formatTime(recordingTime)}
                  </div>
                  <div className="recording-indicator">
                    <span className="pulse-dot"></span>
                    Recording in progress
                  </div>
                </div>
              )}
              
              <button 
                className={`record-button ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                <span className="button-icon">
                  {isRecording ? '⬛' : '⏺️'}
                </span>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
                <div className="button-glow"></div>
              </button>
            </div>
          </div>

          {audioURL && (
            <div className="results-card">
              <div className="card-glow"></div>
              <div className="audio-playback">
                <h3>Review Your Recording</h3>
                <div className="audio-player-container">
                  <audio 
                    src={audioURL} 
                    controls 
                    className="audio-player"
                  />
                </div>
                <div className="recording-actions">
                  <button 
                    className={`action-button submit ${isProcessing ? 'processing' : ''}`}
                    onClick={handleSubmit}
                    disabled={isProcessing}
                  >
                    <span className="button-icon">
                      {isProcessing ? '🔄' : '🤖'}
                    </span>
                    {isProcessing ? 'Processing...' : 'Process with AI'}
                    <div className="button-glow"></div>
                  </button>
                  <button 
                    className="action-button new"
                    onClick={() => {
                      setAudioURL('');
                      setAudioBlob(null);
                    }}
                  >
                    <span className="button-icon">🎤</span>
                    New Recording
                    <div className="button-glow"></div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recording;
