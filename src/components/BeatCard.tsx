import { Heart, Play, ShoppingCart } from 'lucide-react';
import type { Beat, BeatFormat } from '../types';
import BeatFormatSelector from './BeatFormatSelector';

interface BeatCardProps {
  beat: Beat;
  isFavorited: boolean;
  selectedFormat?: BeatFormat;
  onFormatSelect: (format: BeatFormat) => void;
  onFavoriteToggle: () => void;
  onPlay: () => void;
}

export default function BeatCard({
  beat,
  isFavorited,
  selectedFormat,
  onFormatSelect,
  onFavoriteToggle,
  onPlay,
}: BeatCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition">
      <div className="relative">
        <img 
          src={beat.imageUrl} 
          alt={beat.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition"
        >
          <Play className="w-12 h-12 text-white" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{beat.title}</h3>
          <button
            onClick={onFavoriteToggle}
            className={`p-2 rounded-full hover:bg-gray-700 transition ${
              isFavorited ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="text-sm text-gray-400 mb-4">
          <div className="flex justify-between mb-1">
            <p>{beat.bpm} BPM • {beat.key} • {beat.genre}</p>
          </div>
          <div className="flex space-x-4 text-xs">
            <span className="flex items-center">
              <Play className="w-3 h-3 mr-1" />
              {beat.playCount}
            </span>
            <span className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              {beat.favoriteCount}
            </span>
          </div>
        </div>

        <BeatFormatSelector
          formats={beat.formats}
          selectedFormat={selectedFormat}
          onSelect={onFormatSelect}
        />

        <button 
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-md transition mt-4 flex items-center justify-center space-x-2"
          disabled={!selectedFormat}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>
            {selectedFormat 
              ? `Add to Cart - $${selectedFormat.price}`
              : 'Select Format'}
          </span>
        </button>
      </div>
    </div>
  );
}