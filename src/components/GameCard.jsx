// src/components/GameCard.jsx
import StarIcon from '../assets/star.svg?react';
import HeartIcon from '../assets/heart.svg?react';
import PlayerIcon from '../assets/player.svg?react';
import TimeIcon from '../assets/time.svg?react';

const GameCard = ({ game, onClick }) => {

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite(game.id);
    };

    const cleanImageUrl = game.image?.match(/https?:\/\/[^\s]+/)?.[0];

    return (
        <article className="game-card" onClick={() => onClick && onClick(game)}>
            {cleanImageUrl && (
                <img src={cleanImageUrl} alt={game.name} className="game-card-bg" loading="lazy" />
            )}
            <div className="game-card-overlay"></div>

            <div className="game-card-content">
                <div className="game-card-top">
                    <div className="rating-badge">
                        <StarIcon width="14" height="14" />
                        {game.rating}
                    </div>
                </div>

                <div className="game-info">
                    <h3>{game.name}</h3>
                    <div className="game-meta">
                        <span>{game.year}</span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <PlayerIcon width="14" height="14" /> {game.minPlayers}-{game.maxPlayers}
                        </span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <TimeIcon width="14" height="14" /> {game.playingTime}m
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default GameCard;