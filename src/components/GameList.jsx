// src/components/GameList.jsx
import GameCard from './GameCard';

const GameList = ({ games, isFavorite, onToggleFavorite }) => {
    if (!games || games.length === 0) {
        return null; // No renderizar nada si no hay juegos
    }

    return (
        <div className="game-grid">
            {games.map(game => (
                <a 
                    key={game.id}
                    href={`https://boardgamegeek.com/boardgame/${game.id}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="game-grid-item"
                >
                    <GameCard
                        game={game}
                        isFavorite={isFavorite(game.id)}
                        onToggleFavorite={onToggleFavorite}
                    />
                </a>
            ))}
        </div>
    );
};

export default GameList;