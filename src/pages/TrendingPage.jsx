// src/pages/TrendingPage.jsx
import GameList from '../components/GameList';
import { usePaginatedGames } from '../hooks/usePaginatedGames';

// La lista de IDs populares ahora es una constante fuera del componente
const popularGameIds = [174430, 161936, 224517, 167791, 233078, 193738, 220308, 205637, 291457, 342942, 169786, 173346, 266192, 182028, 170216];

const TrendingPage = ({ isFavorite, onToggleFavorite }) => {
    const { displayedGames, isLoading, hasMore, loadMore } = usePaginatedGames(popularGameIds);

    return (
        <div>
            <GameList games={displayedGames} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />
            {isLoading && <p>Loading...</p>}
            {hasMore && !isLoading && (
                <button onClick={loadMore} className="load-more-btn">Load More</button>
            )}
        </div>
    );
};

export default TrendingPage;