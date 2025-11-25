// src/App.jsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TrendingPage from './pages/TrendingPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';
import GameDetails from './components/GameDetails';
import Toast from './components/Toast';
import { useFavorites } from './hooks/useFavorites';

function App() {
  const { favoriteIds, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [selectedGame, setSelectedGame] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleToggleFavorite = (gameId) => {
    if (isFavorite(gameId)) {
      removeFavorite(gameId);
      showToast('Removed from shelf', 'success');
    } else {
      addFavorite(gameId);
      showToast('Added to shelf', 'success');
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
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                onGameClick={handleGameClick}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchPage
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                onGameClick={handleGameClick}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favoriteIds={favoriteIds}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
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
          isFavorite={isFavorite(selectedGame.id)}
          onToggleFavorite={handleToggleFavorite}
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