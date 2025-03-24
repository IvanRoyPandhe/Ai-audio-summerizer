import React, { useState, useRef } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './Recorder.css';

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const timerInterval = useRef(null);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        processAudio(audioBlob);
        audioChunks.current = [];
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      setError('Error accessing microphone. Please check permissions.');
      console.error('Error accessing microphone:', error);
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

  const processAudio = async (audioBlob) => {
    setIsProcessing(true);
    setSummary(null);
    setError(null);

    try {
      // Create FormData to send the audio file
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');

      // Send to backend for processing
      const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process audio');
      }

      const data = await response.json();
      setSummary(data);
    } catch (error) {
      setError('Failed to process audio. Please try again.');
      console.error('Error processing audio:', error);
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
    <div className="recorder-container">
      <div className="recorder-card">
        <h2 className="recorder-title">Record Your Lecture</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="recorder-status">
          {isRecording ? (
            <div className="recording-indicator">
              <span className="recording-dot"></span>
              <span className="recording-time">{formatTime(recordingTime)}</span>
            </div>
          ) : (
            <div className="ready-indicator">
              Ready to Record
            </div>
          )}
        </div>

        <div className="recorder-controls">
          {!isRecording ? (
            <button 
              className="recorder-button record"
              onClick={startRecording}
              disabled={isProcessing}
            >
              <span className="button-icon">🎤</span>
              Start Recording
            </button>
          ) : (
            <button 
              className="recorder-button stop"
              onClick={stopRecording}
            >
              <span className="button-icon">⏹</span>
              Stop Recording
            </button>
          )}
        </div>
      </div>

      {audioURL && (
        <div className="result-card">
          <div className="audio-section">
            <h3>Recording Playback</h3>
            <AudioPlayer audioURL={audioURL} />
          </div>

          <div className="summary-section">
            <h3>AI Summary</h3>
            {isProcessing ? (
              <div className="processing-indicator">
                <div className="spinner"></div>
                <p>Processing your audio...</p>
              </div>
            ) : summary ? (
              <div className="summary-content">
                <div className="summary-main">
                  <h4>Key Points</h4>
                  <ul>
                    {summary.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="summary-details">
                  <h4>Detailed Summary</h4>
                  <p>{summary.detailedSummary}</p>
                </div>

                <div className="summary-actions">
                  <button className="action-button" onClick={() => {/* Add export logic */}}>
                    Export as PDF
                  </button>
                  <button className="action-button" onClick={() => {/* Add copy logic */}}>
                    Copy to Clipboard
                  </button>
                </div>
              </div>
            ) : (
              <p className="no-summary">
                Summary will appear here after processing
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recorder;
