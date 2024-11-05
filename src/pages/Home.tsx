import { useState } from 'react';
import BeatCarousel from '../components/BeatCarousel';
import BeatCard from '../components/BeatCard';
import type { Beat, BeatFormat } from '../types';

const DEMO_BEATS: Beat[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    formats: [
      { type: 'mp3', quality: '320kbps', price: 29.99 },
      { type: 'wav', price: 49.99 },
      { type: 'stems', price: 149.99 }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571974599782-7c0cfa7b55d8',
    bpm: 140,
    key: 'Am',
    mood: 'Dark',
    genre: 'Trap',
    uploadDate: '2024-03-15',
    serialNumber: 'HB001',
    playCount: 1234,
    favoriteCount: 56,
    audioUrl: '/path/to/audio.mp3' // Replace with actual preview URL
  },
  // Add more demo beats here
];

export default function Home() {
  const [featuredBeats] = useState<Beat[]>(DEMO_BEATS);
  const [selectedFormats, setSelectedFormats] = useState<Record<string, BeatFormat>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const handleFormatSelect = (beatId: string, format: BeatFormat) => {
    setSelectedFormats(prev => ({
      ...prev,
      [beatId]: format
    }));
  };

  const handleFavoriteToggle = (beatId: string) => {
    setFavorites(prev => {
      if (prev.includes(beatId)) {
        return prev.filter(id => id !== beatId);
      }
      return [...prev, beatId];
    });
  };

  const handlePlay = (beatId: string) => {
    setCurrentlyPlaying(currentlyPlaying === beatId ? null : beatId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <BeatCarousel beats={featuredBeats} />
      
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Latest Beats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBeats.map((beat) => (
            <BeatCard
              key={beat.id}
              beat={beat}
              isFavorited={favorites.includes(beat.id)}
              selectedFormat={selectedFormats[beat.id]}
              onFormatSelect={(format) => handleFormatSelect(beat.id, format)}
              onFavoriteToggle={() => handleFavoriteToggle(beat.id)}
              onPlay={() => handlePlay(beat.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}