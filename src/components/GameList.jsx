// src/components/GameList.jsx
import GameCard from './GameCard';

const GameList = ({ games, onGameClick }) => {
    if (!games || games.length === 0) {
        return null;
    }

    return (
        <div className="game-grid">
            {games.map(game => (
                <div key={game.id} className="game-grid-item" style={{ cursor: 'pointer' }}>
                    <GameCard
                        game={game}
                        onClick={onGameClick}
                    />
                </div>
            ))}
        </div>
    );
};

export default GameList;