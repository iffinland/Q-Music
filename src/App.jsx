// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'; // useNavigate siia
import Header from './components/Header';
// ... ülejäänud impordid ...
import { songs as mockSongsData } from './data/mockSongs'; // Veendu, et see on olemas
import SearchResultsPage from './pages/SearchResultsPage'; // Veendu, et see on olemas
import HomePage from './pages/HomePage'; // Veendu, et see on olemas
import AddMusicPage from './pages/AddMusicPage'; // Veendu, et see on olemas
import CreatePlaylistPage from './pages/CreatePlaylistPage'; // Veendu, et see on olemas
import Player from './components/Player'; // Veendu, et see on olemas


// App komponent ise ei kasuta useNavigate'i otse, vaid delegeerib AppContent'ile
function App() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [songs, setSongs] = useState([]);

  // Need funktsioonid ei kasuta `navigate`, nii et võivad siin olla
  const handleLogin = () => { setIsLoggedIn(true); setCurrentUser({ name: "TestKasutaja" }); };
  const handleLogout = () => { setIsLoggedIn(false); setCurrentUser(null); };
  const handleToggleLoginLogout = () => { isLoggedIn ? handleLogout() : handleLogin(); };
  const handleSelectSong = (song) => { setSelectedSong(song); };

  return (
    // <Router> EI OLE SIIN ENAM
      <AppContent
        selectedSong={selectedSong}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        songs={songs}
        setSongs={setSongs} // Vajalik, et AppContent saaks laule laadida
        onLoginLogoutClick={handleToggleLoginLogout}
        onSelectSong={handleSelectSong}
      />
    // </Router>
  );
}

// AppContent komponent, mis on BrowserRouteri sees ja saab useNavigate'i kasutada
function AppContent({
  selectedSong, isLoggedIn, currentUser, songs, setSongs,
  onLoginLogoutClick, onSelectSong
}) {
  const navigate = useNavigate(); // useNavigate on siin OK

  useEffect(() => {
    setSongs(mockSongsData); // Lae laulud siin
  }, [setSongs]);

  const actualSearchHandler = (query) => {
    console.log("AppContent sai otsingusõna:", query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
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
      </div>
      <Player currentSong={selectedSong} />
    </div>
  );
}

export default App;