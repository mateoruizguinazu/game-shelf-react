// src/hooks/usePaginatedGames.js
import { useState, useEffect, useCallback } from 'react';
import { getGameDetails } from '../services/bggService';

const GAMES_PER_PAGE = 20;

export const usePaginatedGames = (allGameIds) => {
  const [displayedGames, setDisplayedGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // Función para cargar un lote de juegos
  const loadGames = useCallback(async (page, ids) => {
    setIsLoading(true);
    const startIndex = page * GAMES_PER_PAGE;
    const endIndex = startIndex + GAMES_PER_PAGE;
    const idsToFetch = ids.slice(startIndex, endIndex);

    if (idsToFetch.length > 0) {
      const newGames = await getGameDetails(idsToFetch);
      // Si es la primera página, reemplaza los juegos. Si no, añádelos.
      setDisplayedGames(prevGames => page === 0 ? newGames : [...prevGames, ...newGames]);
      setHasMore(endIndex < ids.length);
    } else {
        setHasMore(false);
    }
    
    setIsLoading(false);
  }, []);
  
  // Efecto que se dispara cuando la lista de IDs cambia (ej. en una nueva búsqueda)
  useEffect(() => {
    setDisplayedGames([]); // Limpia los juegos actuales
    setCurrentPage(0);    // Resetea a la primera página
    if (allGameIds && allGameIds.length > 0) {
      loadGames(0, allGameIds);
    } else {
      setHasMore(false);
    }
  }, [allGameIds, loadGames]);

  // Función que el botón "Cargar Más" llamará
  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadGames(nextPage, allGameIds);
  };
  
  return { displayedGames, isLoading, hasMore, loadMore };
};