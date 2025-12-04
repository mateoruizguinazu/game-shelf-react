import { useState } from 'react';

const FilterBar = ({ onFilterChange, title = "Filters" }) => {
    const [minRating, setMinRating] = useState('');
    const [year, setYear] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleRatingChange = (e) => {
        const val = e.target.value;
        setMinRating(val);
        onFilterChange({ minRating: val, year });
    };

    const handleYearChange = (e) => {
        const val = e.target.value;
        setYear(val);
        onFilterChange({ minRating, year: val });
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
                <div className="filter-row fade-in">
                    <div className="filter-group">
                        <label htmlFor="min-rating">Min Rating:</label>
                        <select id="min-rating" value={minRating} onChange={handleRatingChange}>
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
                            onChange={handleYearChange}
                            className="filter-input"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBar;
