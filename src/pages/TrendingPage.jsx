// src/pages/TrendingPage.jsx
import { useState, useEffect, useMemo } from 'react';
import GameList from '../components/GameList';
import FilterBar from '../components/FilterBar';
import FeaturedCarousel from '../components/FeaturedCarousel';
import { usePaginatedGames } from '../hooks/usePaginatedGames';
import { getHotGames } from '../services/bggService';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const TrendingPage = ({ onGameClick }) => {
    const [hotGameIds, setHotGameIds] = useState(null);
    const { displayedGames, isLoading, hasMore, loadMore } = usePaginatedGames(hotGameIds);
    const [isFetchingIds, setIsFetchingIds] = useState(true);
    const [filters, setFilters] = useState({ minRating: '', year: '' });

    const loadMoreRef = useInfiniteScroll(loadMore, hasMore, isLoading);

    useEffect(() => {
        const fetchHotIds = async () => {
            setIsFetchingIds(true);
            const ids = await getHotGames();
            setHotGameIds(ids);
            setIsFetchingIds(false);
        };
        fetchHotIds();
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const filteredGames = useMemo(() => {
        return displayedGames.filter(game => {
            if (filters.minRating && parseFloat(game.rating) < parseFloat(filters.minRating)) return false;
            if (filters.year && game.year !== filters.year) return false;
            return true;
        });
    }, [displayedGames, filters]);

    // Split for Carousel (Top 5) and Grid (Rest)
    // Only show carousel if NO filters are active, otherwise show all in grid
    const showCarousel = !filters.minRating && !filters.year && filteredGames.length > 0;
    const carouselGames = showCarousel ? filteredGames.slice(0, 5) : [];
    const gridGames = showCarousel ? filteredGames.slice(5) : filteredGames;

    return (
        <div>
            {showCarousel && (
                <FeaturedCarousel games={carouselGames} onGameClick={onGameClick} />
            )}

            <FilterBar onFilterChange={handleFilterChange} title="Other hot games" />

            <GameList
                games={gridGames}
                onGameClick={onGameClick}
            />

            {(isLoading || isFetchingIds) && <p style={{ textAlign: 'center', padding: '2rem' }}>Loading...</p>}

            {hasMore && !isLoading && !isFetchingIds && (
                <div ref={loadMoreRef} style={{ height: '20px', margin: '1rem 0' }}></div>
            )}

            {filteredGames.length === 0 && !isLoading && !isFetchingIds && (
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>No games match your filters. Try scrolling down to load more.</p>
            )}
        </div>
    );
};

export default TrendingPage;