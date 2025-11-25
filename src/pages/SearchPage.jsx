// src/pages/SearchPage.jsx
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import GameList from '../components/GameList';
import { searchGames } from '../services/bggService';
import { usePaginatedGames } from '../hooks/usePaginatedGames';

const SearchPage = ({ isFavorite, onToggleFavorite, onGameClick }) => {
    const [filteredIds, setFilteredIds] = useState(null);
    const { displayedGames, isLoading, hasMore, loadMore } = usePaginatedGames(filteredIds);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (query) => {
        setIsSearching(true);
        setFilteredIds(null);

        // 1. Búsqueda amplia
        const initialResults = await searchGames(query);

        // 2. Filtramos para quedarnos solo con los que incluyen el 'query' en el nombre
        const filteredResults = initialResults.filter(game =>
            game.name && game.name.toLowerCase().includes(query.toLowerCase())
        );

        // 3. Extraemos los IDs de la lista ya filtrada
        const finalIds = filteredResults.map(game => game.id);

        // 4. Pasamos los IDs limpios al hook de paginación
        setFilteredIds(finalIds);
        setIsSearching(false);
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} isLoading={isSearching} />
            <section className="search-results">
                <GameList games={displayedGames} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} onGameClick={onGameClick} />
                {(isLoading || isSearching) && <p style={{ textAlign: 'center' }}>Loading...</p>}
                {hasMore && !isLoading && !isSearching && (
                    <button onClick={loadMore} className="load-more-btn">Load More</button>
                )}
                {filteredIds && filteredIds.length === 0 && !isSearching && (
                    <p style={{ textAlign: 'center' }}>No results found with "{document.getElementById('search-bar')?.value}" in the title.</p>
                )}
            </section>
        </>
    );
};

export default SearchPage;