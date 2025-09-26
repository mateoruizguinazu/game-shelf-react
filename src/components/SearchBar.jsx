// src/components/SearchBar.jsx
import { useState } from 'react';
import SearchIcon from '../assets/search.svg?react';

const SearchBar = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <search>
            <form className="search-container" autoComplete="off" onSubmit={handleSubmit}>
                <label className="visually-hidden" htmlFor="search-bar">Search</label>
                <input
                    type="search"
                    name="search-bar"
                    id="search-bar"
                    placeholder="Search for a game..."
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isLoading}
                />
                <SearchIcon className="search-icon" />
                <button type="submit" disabled={isLoading} style={{display: 'none'}}>Search</button>
            </form>
        </search>
    );
};

export default SearchBar;