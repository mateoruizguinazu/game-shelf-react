// src/App.jsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TrendingPage from './pages/TrendingPage';

import SearchPage from './pages/SearchPage';
import ShelfPage from './pages/ShelfPage';
import ProtectedRoute from './components/ProtectedRoute';
import SettingsPage from './pages/SettingsPage';
import WishlistPage from './pages/WishlistPage';
import AuthPage from './pages/AuthPage';
import GameDetails from './components/GameDetails';
import Toast from './components/Toast';
import { useLibrary } from './hooks/useLibrary';

function App() {
  const {
    collection, addToCollection, removeFromCollection, isInCollection,
    wishlist, addToWishlist, removeFromWishlist, isInWishlist
  } = useLibrary();

  const [selectedGame, setSelectedGame] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleToggleCollection = (gameId) => {
    if (isInCollection(gameId)) {
      removeFromCollection(gameId);
      showToast('Removed from shelf', 'success');
    } else {
      addToCollection(gameId);
      showToast('Added to shelf', 'success');
    }
  };

  const handleToggleWishlist = (gameId) => {
    if (isInWishlist(gameId)) {
      removeFromWishlist(gameId);
      showToast('Removed from wishlist', 'success');
    } else {
      addToWishlist(gameId);
      showToast('Added to wishlist', 'success');
    }
  };

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <TrendingPage
                onGameClick={handleGameClick}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchPage
                onGameClick={handleGameClick}
              />
            }
          />


          // ... imports

          <Route
            path="/shelf"
            element={
              <ProtectedRoute>
                <ShelfPage
                  collectionIds={collection}
                  onGameClick={handleGameClick}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage
                  wishlistIds={wishlist}
                  onGameClick={handleGameClick}
                />
              </ProtectedRoute>
            }
          />
          import SettingsPage from './pages/SettingsPage';

          // ...

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>

      <Footer />

      {
        selectedGame && (
          <GameDetails
            game={selectedGame}
            onClose={handleCloseModal}
            inCollection={isInCollection(selectedGame.id)}
            onToggleCollection={handleToggleCollection}
            inWishlist={isInWishlist(selectedGame.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )
      }

      {
        toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )
      }
    </>
  );
}

export default App;