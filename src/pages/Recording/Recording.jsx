import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Recording.css';

const Recording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const timerInterval = useRef(null);
  const visualizerBars = 30; // Number of visualizer bars

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
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Ready to send to backend:', formData);
      alert('Backend not implemented yet. Audio is ready to be sent!');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
