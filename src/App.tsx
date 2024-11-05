import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Featured from './pages/Featured';
import MixingMastering from './pages/MixingMastering';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/featured" element={<Featured />} />
            <Route path="/mixing" element={<MixingMastering />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
          </Routes>
        </main>
        <footer className="bg-black text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">Hara Nation</h3>
                <p className="text-gray-400">Premium Beats & Music Production</p>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <a href="mailto:harabeats@gmail.com" className="hover:text-purple-400 transition">
                  harabeats@gmail.com
                </a>
                <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} HaraBeats. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}