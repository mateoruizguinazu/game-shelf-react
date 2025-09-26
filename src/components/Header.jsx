// src/components/Header.jsx
import { NavLink } from 'react-router-dom';
import './Header.css'; // Crearemos este archivo CSS para el estilo del enlace activo

const Header = () => {
  return (
    <header>
      <h1 className="visually-hidden">GameShelf</h1>
      <nav id="top-nav" aria-label="Main navigation.">
        <ul>
          <li><NavLink to="/">Trending</NavLink></li>
          <li><NavLink to="/search">Search</NavLink></li>
          <li><NavLink to="/favorites">My shelf</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;