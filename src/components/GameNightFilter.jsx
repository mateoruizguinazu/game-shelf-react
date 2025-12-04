import { useState } from 'react';

const GameNightFilter = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        players: '',
        duration: '',
        type: ''
    });

    const handleChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="game-night-filter">
            <h3>Plan your Game Night</h3>
            <div className="filter-row">
                <div className="filter-group">
                    <label htmlFor="players">Players</label>
                    <input
                        type="number"
                        id="players"
                        placeholder="e.g. 4"
                        value={filters.players}
                        onChange={(e) => handleChange('players', e.target.value)}
                        className="filter-input"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="duration">Duration</label>
                    <select
                        id="duration"
                        value={filters.duration}
                        onChange={(e) => handleChange('duration', e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Any Time</option>
                        <option value="short">Short (&lt; 30m)</option>
                        <option value="medium">Medium (30m - 60m)</option>
                        <option value="long">Long (&gt; 60m)</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="type">Type</label>
                    <select
                        id="type"
                        value={filters.type}
                        onChange={(e) => handleChange('type', e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Any Type</option>
                        <option value="competitive">Competitive</option>
                        <option value="cooperative">Cooperative</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default GameNightFilter;
