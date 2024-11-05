export interface BeatFormat {
  type: 'mp3' | 'wav' | 'stems';
  price: number;
  quality?: string;
  fileUrl?: string;
}

export interface Beat {
  id: string;
  title: string;
  formats: BeatFormat[];
  imageUrl: string;
  bpm: number;
  key: string;
  mood: string;
  genre: string;
  uploadDate: string;
  serialNumber: string;
  playCount: number;
  favoriteCount: number;
  audioUrl?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
  favorites: string[]; // Array of beat IDs
}

export interface CartItem {
  beatId: string;
  formatType: BeatFormat['type'];
  price: number;
}