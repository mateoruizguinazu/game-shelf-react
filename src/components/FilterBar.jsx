// src/components/FilterBar.jsx
import { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
    const [minRating, setMinRating] = useState('');
    const [year, setYear] = useState('');

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
    );
};

export default FilterBar;
