// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox'; // Impordi SearchBox

// Võtame vastu onSearch funktsiooni App.jsx-ist
function Header({ isLoggedIn, currentUser, onLoginLogoutClick, onSearchSubmit }) {
  return (
    <header className="app-header"> {/* Lisa klassinimi stiilimiseks */}
      <div className="header-content"> {/* Wrapper sisu jaoks */}
        <h1>
          <Link to="/" className="logo-link">Q-Music</Link>
        </h1>

        {/* Otsingukast otse Headeris */}
        <div className="search-container"> {/* Wrapper otsingukasti jaoks */}
          <SearchBox onActualSearch={onSearchSubmit} />
        </div>

        <nav className="header-nav">
          <button onClick={onLoginLogoutClick} className="login-button">
            {isLoggedIn ? 'Logi välja' : 'Logi sisse Qortaliga'}
          </button>
          {/* Sisselogitud kasutaja menüü võiks siia ka tulla või profiiliikoon */}
          {isLoggedIn && currentUser && (
            <div className="user-menu">
              {/* Näiteks: <span>Tere, {currentUser.name}</span> */}
              <Link to="/add-music" className="nav-link">Lisa Muusikat</Link>
              <Link to="/create-playlist" className="nav-link">Loo Playlist</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;