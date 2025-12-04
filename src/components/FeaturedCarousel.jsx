import { useState, useEffect } from 'react';
import StarIcon from '../assets/star.svg?react';

const FeaturedCarousel = ({ games, onGameClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % games.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [games.length]);

    if (!games || games.length === 0) return null;

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="featured-carousel">
            <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {games.map((game) => {
                    const cleanImageUrl = game.image?.match(/https?:\/\/[^\s]+/)?.[0];
                    return (
                        <div key={game.id} className="carousel-slide">
                            {cleanImageUrl && (
                                <img src={cleanImageUrl} alt={game.name} className="carousel-image" />
                            )}
                            <div className="carousel-overlay">
                                <div className="carousel-content">
                                    <div className="carousel-meta">
                                        <span>#{games.indexOf(game) + 1} Trending</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <StarIcon width="16" height="16" /> {game.rating}
                                        </span>
                                    </div>
                                    <h2>{game.name}</h2>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => onGameClick(game)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="carousel-nav">
                {games.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default FeaturedCarousel;
