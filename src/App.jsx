// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TrendingPage from './pages/TrendingPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';
import { useFavorites } from './hooks/useFavorites'; // Importa el hook

function App() {
  // Llama al hook para obtener la lógica de favoritos
  const { favoriteIds, addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  // Función para alternar el estado de favorito
  const handleToggleFavorite = (gameId) => {
    if (isFavorite(gameId)) {
      removeFavorite(gameId);
    } else {
      addFavorite(gameId);
    }
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={<TrendingPage isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />} 
          />
          <Route 
            path="/search" 
            element={<SearchPage isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />} 
          />
          <Route 
            path="/favorites" 
            element={<FavoritesPage favoriteIds={favoriteIds} isFavorite={isFavorite} onToggleFavorite={handleToggleFavorite} />} 
          />
        </Routes>
      </main>
    </>
  );
}

export default App;