// src/components/GameDetails.jsx
import { useEffect } from 'react';
import StarIcon from '../assets/star.svg?react';
import HeartIcon from '../assets/heart.svg?react';
import PlayerIcon from '../assets/player.svg?react';
import TimeIcon from '../assets/time.svg?react';

const GameDetails = ({ game, onClose, isFavorite, onToggleFavorite }) => {
    if (!game) return null;

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const cleanImageUrl = game.image?.match(/https?:\/\/[^\s]+/)?.[0];

    return (
        <div className="modal-backdrop fade-in" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    {cleanImageUrl && (
                        <div className="modal-image-container">
                            <img src={cleanImageUrl} alt={game.name} className="modal-image" />
                            <div className="modal-image-overlay"></div>
                        </div>
                    )}
                    <div className="modal-title-section">
                        <h2>{game.name}</h2>
                        <div className="game-meta large">
                            <span className="tag">{game.year}</span>
                            <span className="tag"><PlayerIcon /> {game.minPlayers}-{game.maxPlayers} Players</span>
                            <span className="tag"><TimeIcon /> {game.playingTime} Min</span>
                        </div>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="modal-actions">
                        <div className="rating-large">
                            <StarIcon width="24" height="24" />
                            <span>{game.rating}</span>
                            <span className="rating-count">({game.usersRated} ratings)</span>
                        </div>
                        <button
                            className={`btn btn-primary ${isFavorite ? 'active' : ''}`}
                            onClick={() => onToggleFavorite(game.id)}
                        >
                            <HeartIcon width="20" height="20" fill={isFavorite ? "currentColor" : "none"} />
                            {isFavorite ? 'Saved to Shelf' : 'Add to Shelf'}
                        </button>
                    </div>

                    <div className="modal-description">
                        <h3>About</h3>
                        <p dangerouslySetInnerHTML={{ __html: game.description }}></p>
                    </div>

                    <a
                        href={`https://boardgamegeek.com/boardgame/${game.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bgg-link"
                    >
                        View on BoardGameGeek &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
