import React, { useState } from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ audioURL }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = (event) => {
    setIsPlaying(event.target.paused);
  };

  return (
    <div className="audio-player">
      <div className="audio-player-wrapper">
        <audio 
          controls 
          src={audioURL}
          onPlay={handlePlayPause}
          onPause={handlePlayPause}
        >
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="audio-player-status">
        {isPlaying ? 'Now Playing' : 'Paused'}
      </div>
    </div>
  );
};

export default AudioPlayer;
