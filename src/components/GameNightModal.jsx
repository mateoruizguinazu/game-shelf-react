
import { useState } from 'react';

const GameNightModal = ({ onFilterApply, onClose }) => {
    const [filters, setFilters] = useState({
        players: '',
        duration: ''
    });

    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        onFilterApply(filters);
        onClose();
    };

    return (
        <div className="modal-backdrop fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content" style={{ maxWidth: '500px', padding: '0' }}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="modal-header" style={{ padding: '2rem 2rem 1rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Plan your Game Night</h2>
                </div>

                <div className="modal-body" style={{ padding: '0 2rem 2rem' }}>
                    <div className="filter-group" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="players" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                            How many players?
                        </label>
                        <input
                            type="number"
                            id="players"
                            placeholder="e.g. 4"
                            value={filters.players}
                            onChange={(e) => handleChange('players', e.target.value)}
                            className="filter-input"
                            style={{ width: '100%', padding: '0.75rem' }}
                            autoFocus
                        />
                    </div>

                    <div className="filter-group" style={{ marginBottom: '2rem' }}>
                        <label htmlFor="duration" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Duration</label>
                        <select
                            id="duration"
                            value={filters.duration}
                            onChange={(e) => handleChange('duration', e.target.value)}
                            className="filter-select"
                            style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-darker)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                        >
                            <option value="">Any Time</option>
                            <option value="short">Short (&lt; 30m)</option>
                            <option value="medium">Medium (30m - 60m)</option>
                            <option value="long">Long (&gt; 60m)</option>
                        </select>
                    </div>

                    <button
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        onClick={handleApply}
                    >
                        Find Games
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameNightModal;
