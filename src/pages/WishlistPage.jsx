import GameList from '../components/GameList';
import { usePaginatedGames } from '../hooks/usePaginatedGames';

const WishlistPage = ({ wishlistIds, onGameClick }) => {
    const { displayedGames, isLoading, hasMore, loadMore } = usePaginatedGames(wishlistIds);

    if (!isLoading && displayedGames.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h3>Your wishlist is empty</h3>
                <p>Explore trending games and add them to your wishlist!</p>
            </div>
        );
    }

    return (
        <section className="wishlist-page">
            <h2>My Wishlist</h2>
            <GameList games={displayedGames} onGameClick={onGameClick} />
            {isLoading && <p>Loading...</p>}
            {hasMore && !isLoading && (
                <button onClick={loadMore} className="load-more-btn">Load More</button>
            )}
        </section>
    );
};

export default WishlistPage;
