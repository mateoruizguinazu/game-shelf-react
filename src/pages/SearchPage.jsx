// src/pages/SearchPage.jsx
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import GameList from '../components/GameList';
import { searchGames } from '../services/bggService';
import { usePaginatedGames } from '../hooks/usePaginatedGames';

const SearchPage = ({ isFavorite, onToggleFavorite }) => {
    const [allFoundIds, setAllFoundIds] = useState(null);
    const { displayedGames, isLoading, hasMore, loadMore } = usePaginatedGames(allFoundIds);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (query) => {
        setIsSearching(true);
        setAllFoundIds(null); // Resetea la búsqueda anterior
        const initialResults = await searchGames(query);
        setAllFoundIds(initialResults.map(game => game.id));
        setIsSearching(false);
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} isLoading={isSearching} />
            <section className="search-results">
                <GameList games={displayedGames} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />
                {(isLoading || isSearching) && <p>Loading...</p>}
                {hasMore && !isLoading && !isSearching &&(
                    <button onClick={loadMore} className="load-more-btn">Load More</button>
                )}
                {allFoundIds && allFoundIds.length === 0 && <p>No results found.</p>}
            </section>
        </>
    );
};

export default SearchPage;