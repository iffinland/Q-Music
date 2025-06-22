import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Player from './components/Player';
import HomePage from './pages/HomePage';
import AddMusicPage from './pages/AddMusicPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import SearchResultsPage from './pages/SearchResultsPage';
import { songs as initialMockSongs } from './data/mockSongs'; // Muutsin nime, et vältida konflikti 'songs' state'iga
import './App.css';
// import './Header.css';


// App komponent on välimine kest
function App() {
  // console.log("App komponent renderdab");
  // Siin võiksid olla olekud, mis EI sõltu otseselt routeri kontekstist
  // või mida AppContent ei pea muutma, vaid ainult lugema.
  // Aga lihtsuse mõttes võib App olla ka lihtsalt wrapper AppContentile.
  return (
    <AppContent />
  );
}

// AppContent komponent, mis sisaldab enamikku loogikast
function AppContent() {
  const navigate = useNavigate(); // useNavigate on siin OK

  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [songs, setSongs] = useState([]); // See on nüüd õige 'songs' olek

  useEffect(() => {
    setSongs(initialMockSongs); // Kasuta imporditud mock-andmeid
  }, []); // Tühi sõltuvuste massiiv

  const handleLogin = () => { setIsLoggedIn(true); setCurrentUser({ name: "TestKasutaja" }); alert("Sisse logitud (sim)!");};
  const handleLogout = () => { setIsLoggedIn(false); setCurrentUser(null); alert("Välja logitud.");};
  const handleToggleLoginLogout = () => { isLoggedIn ? handleLogout() : handleLogin(); };
  const handleSelectSong = (song) => { setSelectedSong(song); };

  const actualSearchHandler = (query) => {
    // console.log("AppContent sai otsingusõna:", query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const stats = {
    totalSongs: songs.length,
    totalPlaylists: 15,
    totalCreators: 7,
  };

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginLogoutClick={handleToggleLoginLogout}
        onSearchSubmit={actualSearchHandler}
      />
      <div className="content-wrapper" style={{ display: 'flex', flexGrow: 1 }}>
        <main className="main-content" style={{ flexGrow: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<HomePage songs={songs} onSongSelect={handleSelectSong} />} />
            <Route path="/add-music" element={isLoggedIn ? <AddMusicPage /> : <Navigate to="/" replace />} />
            <Route path="/create-playlist" element={isLoggedIn ? <CreatePlaylistPage /> : <Navigate to="/" replace />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<div><h2>404 Lehte ei leitud</h2><Link to="/">Mine avalehele</Link></div>} />
          </Routes>
        </main>
        <aside className="sidebar" style={{ width: '250px', padding: '1rem', borderLeft: '1px solid #ccc', backgroundColor: '#f9f9f9', flexShrink: 0 }}>
          <section className="stats-section" style={{ marginBottom: '1.5rem' }}>
            <h4>Statistika</h4>
            <p>Lugusid kokku: {stats.totalSongs}</p>
            <p>Playliste kokku: {stats.totalPlaylists}</p>
            <p>Sisuloojaid: {stats.totalCreators}</p>
          </section>
          {isLoggedIn && currentUser && (
            <section className="user-section">
              <div className="user-avatar" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <img
                  src={`https://via.placeholder.com/80/cccccc/000000?text=${currentUser.name.substring(0,1)}`}
                  alt={`${currentUser.name} avatar`}
                  style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                />
                <p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{currentUser.name}</p>
              </div>
              <nav className="user-menu">
                <ul>
                  <li><Link to="/add-music">Lae Üles Muusikat</Link></li>
                  <li><Link to="/create-playlist">Loo Uus Playlist</Link></li>
                </ul>
              </nav>
            </section>
          )}
          {!isLoggedIn && (
            <section className="login-prompt" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <p>Sisu lisamiseks ja playlistide loomiseks logi sisse.</p>
              <button onClick={handleToggleLoginLogout} style={{ padding: '0.5rem 1rem' }}>
                Logi sisse Qortaliga
              </button>
            </section>
          )}
          <section className="future-content" style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
            <p><em>(Siia tuleb hiljem muud põnevat...)</em></p>
          </section>
        </aside>
      </div>
      <Player currentSong={selectedSong} />
    </div>
  );
}

export default App; // <--- EKSPORDI App VAIKIMISI