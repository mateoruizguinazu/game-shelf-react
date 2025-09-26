// src/components/GameCard.jsx
import StarIcon from '../assets/star.svg?react';
import HeartIcon from '../assets/heart.svg?react';
import PlayerIcon from '../assets/player.svg?react';
import TimeIcon from '../assets/time.svg?react';

const GameCard = ({ game, isFavorite, onToggleFavorite }) => {
    
    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace
        e.stopPropagation(); // Detiene la propagación del clic hacia la etiqueta <a>
        onToggleFavorite(game.id);
    };

    const cleanImageUrl = game.image?.match(/https?:\/\/[^\s]+/)?.[0];
    const hasValidImage = !!cleanImageUrl;

    const descriptionText = game.description 
        ? game.description.split('.')[0] + '.' 
        : 'No description available.';

    return (
        // Se ha cambiado la estructura para usar una etiqueta <img>
        <article className="game-card">
            {hasValidImage ? (
                <img src={cleanImageUrl} alt={`Cover for ${game.name}`} className="game-card-background" />
            ) : (
                <div className="game-card-background-fallback"></div>
            )}
            
            {/* Todo el contenido ahora va dentro de un contenedor */}
            <div className="game-card-content">
                <div className="game-card-top-elements">
                    <span className="rating">
                        <StarIcon /> {game.rating}
                    </span>
                    <button 
                        className="favorite-button" 
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        onClick={handleFavoriteClick}
                        style={{ backgroundColor: isFavorite ? 'var(--like)' : 'var(--darker)' }}
                    >
                        <HeartIcon />
                    </button>
                </div>
                <header className="game-card-header">
                    <h3>{game.name}</h3>
                    <p>{descriptionText}</p>
                </header>
                <div className="game-labels">
                    <span className="game-tag">{game.year}</span>
                    <span className="game-tag"><PlayerIcon /> {game.minPlayers}-{game.maxPlayers}</span>
                    <span className="game-tag"><TimeIcon /> {game.playingTime} min</span>
                </div>
            </div>
        </article>
    );
};

export default GameCard;