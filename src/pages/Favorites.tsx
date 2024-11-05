import { useState } from 'react';
import { Music } from 'lucide-react';
import BeatCard from '../components/BeatCard';
import type { Beat, BeatFormat } from '../types';

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<Record<string, BeatFormat>>({});
  const [favoriteBeats, setFavoriteBeats] = useState<Beat[]>([]); // This would be populated from your backend

  const handleFormatSelect = (beatId: string, format: BeatFormat) => {
    setSelectedFormats(prev => ({
      ...prev,
      [beatId]: format
    }));
  };

  const handleFavoriteToggle = (beatId: string) => {
    setFavorites(prev => prev.filter(id => id !== beatId));
  };

  const handlePlay = (beatId: string) => {
    // Implement play functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4 mb-8">
          <Music className="w-8 h-8 text-purple-500" />
          <h1 className="text-3xl font-bold">Your Favorite Beats</h1>
        </div>

        {favoriteBeats.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-gray-400">
              Start exploring beats and add them to your favorites!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteBeats.map((beat) => (
              <BeatCard
                key={beat.id}
                beat={beat}
                isFavorited={true}
                selectedFormat={selectedFormats[beat.id]}
                onFormatSelect={(format) => handleFormatSelect(beat.id, format)}
                onFavoriteToggle={() => handleFavoriteToggle(beat.id)}
                onPlay={() => handlePlay(beat.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}