import { useState, useEffect, useMemo } from 'react';
import GameList from '../components/GameList';
import GameNightModal from '../components/GameNightModal';
import { getGameDetails } from '../services/bggService';

const ShelfPage = ({ collectionIds, onGameClick }) => {
    const [allGames, setAllGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({ players: '', duration: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCollection = async () => {
            if (!collectionIds || collectionIds.length === 0) {
                setAllGames([]);
                return;
            }
            setIsLoading(true);
            try {
                // Fetch details for ALL games in collection to allow filtering
                const games = await getGameDetails(collectionIds);
                setAllGames(games);
            } catch (error) {
                console.error("Failed to fetch collection details", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCollection();
    }, [collectionIds]);

    const filteredGames = useMemo(() => {
        return allGames.filter(game => {
            // Filter by Players
            if (filters.players) {
                const p = parseInt(filters.players);
                const min = parseInt(game.minPlayers);
                const max = parseInt(game.maxPlayers);
                if (p < min || p > max) return false;
            }

            // Filter by Duration
            if (filters.duration) {
                const time = parseInt(game.playingTime);
                if (filters.duration === 'short' && time >= 30) return false;
                if (filters.duration === 'medium' && (time < 30 || time > 60)) return false;
                if (filters.duration === 'long' && time <= 60) return false;
            }

            return true;
        });
    }, [allGames, filters]);

    const handleFilterApply = (newFilters) => {
        setFilters(newFilters);
    };

    const clearFilters = () => {
        setFilters({ players: '', duration: '' });
    };

    const hasActiveFilters = filters.players || filters.duration;

    if (!isLoading && collectionIds.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h3>Your shelf is empty</h3>
                <p>Add games to your shelf to start planning your game nights!</p>
            </div>
        );
    }

    return (
        <section className="shelf-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>My Shelf</h2>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    Plan Game Night 🎲
                </button>
            </div>

            {hasActiveFilters && (
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <p style={{ margin: 0, fontStyle: 'italic' }}>
                        Found {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''} for your night.
                    </p>
                    <button
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {isLoading ? (
                <p>Loading your collection...</p>
            ) : (
                <GameList games={filteredGames} onGameClick={onGameClick} />
            )}

            {isModalOpen && (
                <GameNightModal
                    onFilterApply={handleFilterApply}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </section>
    );
};

export default ShelfPage;
