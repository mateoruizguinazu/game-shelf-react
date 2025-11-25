// src/pages/FavoritesPage.jsx
import GameList from '../components/GameList';
import { usePaginatedGames } from '../hooks/usePaginatedGames';

const FavoritesPage = ({ favoriteIds, isFavorite, onToggleFavorite, onGameClick }) => {
    const { displayedGames, isLoading, hasMore, loadMore } = usePaginatedGames(favoriteIds);

    if (!isLoading && displayedGames.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h3>Your shelf is empty</h3>
                <p>Search for a game and add it to your favorites.</p>
            </div>
        );
    }

    return (
        <section className="favorites-list">
            <h2>My Favorites</h2>
            <GameList games={displayedGames} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} onGameClick={onGameClick} />
            {isLoading && <p>Loading...</p>}
            {hasMore && !isLoading && (
                <button onClick={loadMore} className="load-more-btn">Load More</button>
            )}
        </section>
    );
};

export default FavoritesPage;