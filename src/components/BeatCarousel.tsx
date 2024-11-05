import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { Beat } from '../types';

interface BeatCarouselProps {
  beats: Beat[];
}

export default function BeatCarousel({ beats }: BeatCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % beats.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [beats.length]);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const currentBeat = beats[currentIndex];

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{ backgroundImage: `url(${currentBeat.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center h-full text-white">
            <h2 className="text-4xl font-bold mb-4">{currentBeat.title}</h2>
            <div className="flex items-center space-x-4 mb-6">
              <span>{currentBeat.bpm} BPM</span>
              <span>{currentBeat.key}</span>
              <span>{currentBeat.genre}</span>
            </div>
            <button
              onClick={toggleSound}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition"
            >
              {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              <span>{isPlaying ? 'Mute Preview' : 'Play Preview'}</span>
            </button>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={currentBeat.audioUrl}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {beats.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-purple-500' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}