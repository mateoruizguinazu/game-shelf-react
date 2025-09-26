// src/hooks/useFavorites.js
import { useState, useEffect } from 'react';

export const useFavorites = () => {
  // Inicializa el estado leyendo de localStorage
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteGames');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Cada vez que favoriteIds cambie, guárdalo en localStorage
  useEffect(() => {
    localStorage.setItem('favoriteGames', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const addFavorite = (gameId) => {
    setFavoriteIds(prevIds => [...prevIds, gameId]);
  };

  const removeFavorite = (gameId) => {
    setFavoriteIds(prevIds => prevIds.filter(id => id !== gameId));
  };

  const isFavorite = (gameId) => {
    return favoriteIds.includes(gameId);
  };

  return { favoriteIds, addFavorite, removeFavorite, isFavorite };
};