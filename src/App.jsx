// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'; // Veendu, et useNavigate on siin (üks kord)
import { songs as initialMockSongs } from "./data/mockSongs";
import Header from './components/Header'; // <--- LISA TAGASI
import Player from './components/Player';   // <--- LISA TAGASI
import HomePage from './pages/HomePage'; // <--- LISA TAGASI
import AddMusicPage from './pages/AddMusicPage'; // Lisame hiljem
import CreatePlaylistPage from './pages/CreatePlaylistPage'; // Lisame hiljem
import SearchResultsPage from './pages/SearchResultsPage'; // Lisame hiljem
// import App from './App';
import './App.css'; // Kui kasutad

function App() {
  console.log("App KOMPONENT RENDERDAB AppContent'i");
  return (<AppContent />);
}

function AppContent() {
  const navigate = useNavigate();
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(initialMockSongs);
  }, []);

  // Handlerid lisame järgmises sammus, aga defineerime need tühjadena, et propsid ei annaks viga
  const handleSelectSong = (song) => { console.log("handleSelectSong kutsutud", song); setSelectedSong(song); };
  const actualSearchHandler = (query) => { console.log("actualSearchHandler kutsutud", query); navigate(`/search?q=${encodeURIComponent(query)}`); };
  const handleToggleLoginLogout = () => { console.log("handleToggleLoginLogout kutsutud"); /* Sinu sisse/välja logimise loogika siia */ };
  const handleNavigateToAction = (path) => { console.log("handleNavigateToAction kutsutud", path); /* Sinu autentimise ja navigeerimise loogika siia */ };


  console.log("AppContent render: isLoggedIn:", isLoggedIn, "Laulude arv:", songs.length);

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginLogoutClick={handleToggleLoginLogout}
        onSearchSubmit={actualSearchHandler}
        onNavigateToAction={handleNavigateToAction}
      />
      <div className="content-wrapper"> {/* Kui sul oli see, siis lisa tagasi */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage songs={songs} onSongSelect={handleSelectSong} />} />
            {/* Lisame teised route'id hiljem */}
            {/* <Route path="/search" element={<SearchResultsPage />} /> */}
            {/* <Route path="/add-music" element={isLoggedIn ? <AddMusicPage /> : <Navigate to="/" />} /> */}
            {/* <Route path="/create-playlist" element={isLoggedIn ? <CreatePlaylistPage /> : <Navigate to="/" />} /> */}
            <Route path="*" element={<div><h2>404 Lehte ei leitud</h2><Link to="/">Mine avalehele</Link></div>} />
          </Routes>
        </main>
        {/* Külgriba, kui see oli ja tahad tagasi (praegu eemaldatud) */}
      </div>
      <Player currentSong={selectedSong} />
    </div>
  );
}

export default App;