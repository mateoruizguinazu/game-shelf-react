import { useState } from 'react';
import { Link } from 'react-router-dom';
import gameshelfLogo from '../assets/gameshelf-logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/shelf" className="nav-link" onClick={closeMenu}>My Shelf</Link>
          <Link to="/wishlist" className="nav-link" onClick={closeMenu}>Wishlist</Link>
          <Link to="/" className="nav-link" onClick={closeMenu}>Trending</Link>
          <Link to="/search" className="nav-link" onClick={closeMenu}>Search</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;