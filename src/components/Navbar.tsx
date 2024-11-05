import { ShoppingCart, User, Home, Compass, Music2, Mic2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Music2 className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold">HaraBeats</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1 hover:text-purple-400 transition">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/explore" className="flex items-center space-x-1 hover:text-purple-400 transition">
              <Compass className="w-4 h-4" />
              <span>Explore</span>
            </Link>
            <Link to="/featured" className="hover:text-purple-400 transition">Featured</Link>
            <Link to="/mixing" className="flex items-center space-x-1 hover:text-purple-400 transition">
              <Mic2 className="w-4 h-4" />
              <span>M&M</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/favorites" className="hover:text-purple-400 transition">
              <Heart className="w-6 h-6" />
            </Link>
            <Link to="/account" className="hover:text-purple-400 transition">
              <User className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="hover:text-purple-400 transition">
              <ShoppingCart className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}