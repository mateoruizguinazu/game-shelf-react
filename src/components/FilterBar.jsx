import { useState } from 'react';

const FilterBar = ({ onFilterChange, title = "Filters" }) => {
    const [minRating, setMinRating] = useState('');
    const [year, setYear] = useState('');
    const [minPlayers, setMinPlayers] = useState('');
    const [maxTime, setMaxTime] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);

    const updateFilters = (key, value) => {
        const newFilters = {
            minRating: key === 'minRating' ? value : minRating,
            year: key === 'year' ? value : year,
            minPlayers: key === 'minPlayers' ? value : minPlayers,
            maxTime: key === 'maxTime' ? value : maxTime
        };
        onFilterChange(newFilters);
    };

    const handleChange = (key, value) => {
        if (key === 'minRating') setMinRating(value);
        if (key === 'year') setYear(value);
        if (key === 'minPlayers') setMinPlayers(value);
        if (key === 'maxTime') setMaxTime(value);

        updateFilters(key, value);
    };

    return (
        <div className="filter-bar">
            <div
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: isCollapsed ? '0' : '1rem' }}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>{title}</h3>
                <button className="btn btn-outline" style={{ padding: '0.5rem', border: 'none' }}>
                    {isCollapsed ? 'Show Filters ▼' : 'Hide Filters ▲'}
                </button>
            </div>

            {!isCollapsed && (
                <div className="filter-row fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    <div className="filter-group">
                        <label htmlFor="min-rating">Min Rating:</label>
                        <select id="min-rating" value={minRating} onChange={(e) => handleChange('minRating', e.target.value)}>
                            <option value="">Any</option>
                            <option value="7">7+</option>
                            <option value="8">8+</option>
                            <option value="9">9+</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="year">Year:</label>
                        <input
                            type="number"
                            id="year"
                            placeholder="e.g. 2023"
                            value={year}
                            onChange={(e) => handleChange('year', e.target.value)}
                            className="filter-input"
                        />
                    </div>
                    <div className="filter-group">
                        <label htmlFor="min-players">Min Players:</label>
                        <input
                            type="number"
                            id="min-players"
                            placeholder="e.g. 2"
                            value={minPlayers}
                            onChange={(e) => handleChange('minPlayers', e.target.value)}
                            className="filter-input"
                        />
                    </div>
                    <div className="filter-group">
                        <label htmlFor="max-time">Max Time:</label>
                        <select id="max-time" value={maxTime} onChange={(e) => handleChange('maxTime', e.target.value)}>
                            <option value="">Any</option>
                            <option value="30">&lt; 30m</option>
                            <option value="60">&lt; 60m</option>
                            <option value="90">&lt; 90m</option>
                            <option value="120">&lt; 120m</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBar;
