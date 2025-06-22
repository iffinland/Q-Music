// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'; // useNavigate siia
import Header from './components/Header';
import { songs as mockSongsData } from './data/mockSongs'; // Veendu, et see on olemas
import SearchResultsPage from './pages/SearchResultsPage'; // Veendu, et see on olemas
import HomePage from './pages/HomePage'; // Veendu, et see on olemas
import AddMusicPage from './pages/AddMusicPage'; // Veendu, et see on olemas
import CreatePlaylistPage from './pages/CreatePlaylistPage'; // Veendu, et see on olemas
import Player from './components/Player'; // Veendu, et see on olemas
// Võid luua eraldi komponendi statistika jaoks, kui soovid
// import StatisticsWidget from './components/StatisticsWidget';

function AppContent({
  selectedSong, isLoggedIn, currentUser, songs, setSongs,
  onLoginLogoutClick, onSelectSong
}) {
  const navigate = useNavigate();

  useEffect(() => {
    // Simuleerime laulude laadimist (hiljem API-st)
    // mockSongsData peaks olema imporditud või kättesaadav
    setSongs(mockSongsData);
  }, [setSongs]);

  const actualSearchHandler = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Simuleeritud statistika andmed (hiljem tulevad API-st)
  const stats = {
    totalSongs: songs.length, // Kasutame praegu mock-laulude arvu
    totalPlaylists: 15, // Lihtsalt näidisarv
    totalCreators: 7,   // Lihtsalt näidisarv
  };

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginLogoutClick={onLoginLogoutClick}
        onSearchSubmit={actualSearchHandler}
      />
      <div className="content-wrapper" style={{ display: 'flex', flexGrow: 1 }}>
        <main className="main-content" style={{ flexGrow: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<HomePage songs={songs} onSongSelect={onSelectSong} />} />
            <Route path="/add-music" element={isLoggedIn ? <AddMusicPage /> : <Navigate to="/" replace />} />
            <Route path="/create-playlist" element={isLoggedIn ? <CreatePlaylistPage /> : <Navigate to="/" replace />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<div><h2>404 Lehte ei leitud</h2><Link to="/">Mine avalehele</Link></div>} />
          </Routes>
        </main>

        {/* ALATI NÄHTAV KÜLGRIBA */}
        <aside className="sidebar" style={{ width: '250px', padding: '1rem', borderLeft: '1px solid #ccc', backgroundColor: '#f9f9f9', flexShrink: 0 }}>
          {/* Otsingukast, kui see peaks olema külgribas (praegu on Headeris) */}
          {/* <SearchBox onSearch={actualSearchHandler} /> */}

          {/* Statistika sektsioon - alati nähtav */}
          <section className="stats-section" style={{ marginBottom: '1.5rem' }}>
            <h4>Statistika</h4>
            <p>Lugusid kokku: {stats.totalSongs}</p>
            <p>Playliste kokku: {stats.totalPlaylists}</p>
            <p>Sisuloojaid: {stats.totalCreators}</p>
          </section>

          {/* Sisselogitud kasutaja sektsioon */}
          {isLoggedIn && currentUser && (
            <section className="user-section">
              <div className="user-avatar" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {/* TODO: Kasutaja avatar (tuleb hiljem API-st) */}
                <img
                  src={`https://via.placeholder.com/80/cccccc/000000?text=${currentUser.name.substring(0,1)}`} // Lihtne placeholder avatar
                  alt={`${currentUser.name} avatar`}
                  style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                />
                <p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{currentUser.name}</p>
              </div>
              <nav className="user-menu">
                <ul>
                  <li><Link to="/add-music">Lae Üles Muusikat</Link></li>
                  <li><Link to="/create-playlist">Loo Uus Playlist</Link></li>
                  {/* Veel linke vastavalt vajadusele */}
                  {/* <li><Link to="/my-profile">Minu Profiil</Link></li> */}
                  {/* <li><Link to="/my-songs">Minu Lood</Link></li> */}
                  {/* <li><Link to="/my-playlists">Minu Playlistid</Link></li> */}
                </ul>
              </nav>
            </section>
          )}

          {/* Kui kasutaja pole sisse logitud, võiks siin olla sisselogimise nupp/üleskutse */}
          {!isLoggedIn && (
            <section className="login-prompt" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <p>Sisu lisamiseks ja playlistide loomiseks logi sisse.</p>
              <button onClick={onLoginLogoutClick} style={{ padding: '0.5rem 1rem' }}>
                Logi sisse Qortaliga
              </button>
            </section>
          )}

          {/* Tulevane "muu põnev" ala */}
          <section className="future-content" style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
            <p><em>(Siia tuleb hiljem muud põnevat...)</em></p>
          </section>

        </aside>
      </div> {/* .content-wrapper lõpp */}
      <Player currentSong={selectedSong} />
    </div>
  );
}

// ... (App komponent ise, mis renderdab AppContent) ...
export default AppContent;