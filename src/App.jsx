// src/App.jsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TrendingPage from './pages/TrendingPage';

import SearchPage from './pages/SearchPage';
import ShelfPage from './pages/ShelfPage';
import WishlistPage from './pages/WishlistPage';
import GameDetails from './components/GameDetails';
import Toast from './components/Toast';
import { useLibrary } from './hooks/useLibrary';

function App() {
  const {
    collection, addToCollection, removeFromCollection, inCollection,
    wishlist, addToWishlist, removeFromWishlist, inWishlist
  } = useLibrary();

  const [selectedGame, setSelectedGame] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleToggleCollection = (gameId) => {
    if (inCollection(gameId)) {
      removeFromCollection(gameId);
      showToast('Removed from shelf', 'success');
    } else {
      addToCollection(gameId);
      showToast('Added to shelf', 'success');
    }
  };

  const handleToggleWishlist = (gameId) => {
    if (inWishlist(gameId)) {
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
          <Route
            path="/shelf"
            element={
              <ShelfPage
                collectionIds={collection}
                onGameClick={handleGameClick}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <WishlistPage
                wishlistIds={wishlist}
                onGameClick={handleGameClick}
              />
            }
          />
        </Routes>
      </main>

      <Footer />

      {selectedGame && (
        <GameDetails
          game={selectedGame}
          onClose={handleCloseModal}
          inCollection={inCollection(selectedGame.id)}
          onToggleCollection={handleToggleCollection}
          inWishlist={inWishlist(selectedGame.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default App;