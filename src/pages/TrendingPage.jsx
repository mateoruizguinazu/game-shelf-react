// src/pages/TrendingPage.jsx
import { useState, useEffect } from 'react';
import GameList from '../components/GameList';
import { usePaginatedGames } from '../hooks/usePaginatedGames';
import { getHotGames } from '../services/bggService';

const TrendingPage = ({ isFavorite, onToggleFavorite }) => {
    const [hotGameIds, setHotGameIds] = useState(null);
    const { displayedGames, isLoading, hasMore, loadMore } = usePaginatedGames(hotGameIds);
    const [isFetchingIds, setIsFetchingIds] = useState(true);

    useEffect(() => {
        const fetchHotIds = async () => {
            setIsFetchingIds(true);
            const ids = await getHotGames();
            setHotGameIds(ids);
            setIsFetchingIds(false);
        };
        fetchHotIds();
    }, []);

    return (
        <div>
            <GameList games={displayedGames} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />
            {(isLoading || isFetchingIds) && <p style={{textAlign: 'center'}}>Loading...</p>}
            {hasMore && !isLoading && !isFetchingIds && (
                <button onClick={loadMore} className="load-more-btn">Load More</button>
            )}
        </div>
    );
};

export default TrendingPage;