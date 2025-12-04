
import { useState } from 'react';
import { Link } from 'react-router-dom';
import gameshelfLogo from '../assets/gameshelf-logo.svg';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/shelf" className="logo" onClick={closeMenu}>
          <img src={gameshelfLogo} alt="GameShelf Logo" />
          <h1>GameShelf</h1>
        </Link>

        <button
          className={`hamburger-btn ${isMenuOpen ? 'open' : ''} `}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''} `}>
          {user && (
            <>
              <Link to="/shelf" className="nav-link" onClick={closeMenu}>My Shelf</Link>
              <Link to="/wishlist" className="nav-link" onClick={closeMenu}>Wishlist</Link>
            </>
          )}
          <Link to="/" className="nav-link" onClick={closeMenu}>Trending</Link>
          <Link to="/search" className="nav-link" onClick={closeMenu}>Search</Link>

          {user ? (
            <div className="user-menu" style={{ position: 'relative' }}>
              <button
                className="nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={(e) => {
                  e.currentTarget.nextElementSibling.classList.toggle('show');
                }}
              >
                {user.email} ▼
              </button>
              <div className="dropdown-content" style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                background: 'var(--bg-darker)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '0.5rem',
                minWidth: '200px',
                display: 'none',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <Link to="/settings" className="nav-link" onClick={closeMenu} style={{ display: 'block' }}>Settings</Link>
                <button
                  onClick={() => { signOut(); closeMenu(); }}
                  className="nav-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', textAlign: 'left', width: '100%', color: 'var(--accent-red)' }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="nav-link" onClick={closeMenu} style={{ color: 'var(--primary)' }}>
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;