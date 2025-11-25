// src/components/SearchBar.jsx
import { useState, useEffect } from 'react';
import SearchIcon from '../assets/search.svg?react';

const SearchBar = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                onSearch(query.trim());
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <div className="search-wrapper">
            <form className="search-container" autoComplete="off" onSubmit={handleSubmit}>
                <label className="visually-hidden" htmlFor="search-bar">Search</label>
                <SearchIcon className="search-icon" width="20" height="20" />
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
            </form>
        </div>
    );
};

export default SearchBar;