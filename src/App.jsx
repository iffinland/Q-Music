// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { songs as initialMockSongs } from "./data/mockSongs"; // Mock andmed

// Komponentide impordid
import Header from './components/Header';
import Player from './components/Player';

// Lehtede impordid
import HomePage from './pages/HomePage';
import AddMusicPage from './pages/AddMusicPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import SearchResultsPage from './pages/SearchResultsPage';

// CSS impordid
import './App.css';
// import './Header.css'; // Kui sul on eraldi Header.css, siis impordi see

// Peamine App komponent, mis renderdab AppContent'i (vajalik useNavigate korrektseks toimimiseks)
function App() {
  // console.log("App komponent renderdab AppContent'i");
  return (<AppContent />);
}

// AppContent komponent, kus on enamus rakenduse loogikast ja JSX-ist
function AppContent() {
  const navigate = useNavigate(); // React Routeri navigeerimise hook

  // Olekumuutujad
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Hoiab infot sisselogitud kasutaja kohta
  const [songs, setSongs] = useState([]); // Hoiab laulude nimekirja

  // Efekt laulude laadimiseks komponendi esmakordsel mountimisel
  useEffect(() => {
    setSongs(initialMockSongs); // Laeme mock-andmed
    // console.log("AppContent useEffect: Laulud laetud");
  }, []); // Tühi sõltuvuste massiiv tähendab, et see jookseb ainult korra

  // ----- HANDLER-FUNKTSIOONID -----

  // Käivitub, kui laulul klikitakse MusicListis
  const handleSelectSong = (song) => {
    // console.log("handleSelectSong kutsutud:", song);
    setSelectedSong(song);
  };

  // Käivitub, kui otsingukastis tehakse otsing
  const actualSearchHandler = (query) => {
    // console.log("actualSearchHandler kutsutud, otsing:", query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Käivitub "Logi sisse/välja" nupul
  const handleToggleLoginLogout = () => {
    if (isLoggedIn) {
      // Logout loogika
      setIsLoggedIn(false);
      setCurrentUser(null);
      alert("Oled välja logitud.");
    } else {
      // Login loogika (praegu simuleeritud promptiga)
      const qortalName = prompt("Palun sisesta oma Qortali nimi sisselogimiseks:");
      if (qortalName && qortalName.trim() !== "") {
        // TODO: Siia tuleb päris Qortali nime kontroll ja autentimine http://localhost:12391 kaudu
        setIsLoggedIn(true);
        setCurrentUser({ name: qortalName.trim(), address: "QfakeAddress123" }); // Simuleeritud kasutaja
        alert(`Tere tulemast, ${qortalName.trim()}! (Simuleeritud sisselogimine)`);
      } else {
        // Kasutaja ei sisestanud nime või vajutas Cancel
        // Võib-olla ei tee midagi või annab teate, et nimi on vajalik
      }
    }
    // console.log("handleToggleLoginLogout kutsutud, isLoggedIn nüüd:", !isLoggedIn);
  };

  // Käivitub "Lisa Muusikat" / "Lisa Playlist" nuppudel
  const handleNavigateToAction = async (targetPath) => {
    // console.log("handleNavigateToAction kutsutud, tee:", targetPath);
    // 1. Kontrolli, kas kasutaja on juba rakenduse mõistes sisse logitud
    if (isLoggedIn && currentUser) {
      navigate(targetPath);
      return;
    }

    // 2. Kui pole sisse logitud, proovi Qortali autentimist (AJUTINE PROMPT)
    // TODO: Asenda see päris Qortali autentimisloogikaga
    const qortalName = prompt(`Selle toimingu (${targetPath}) tegemiseks palun sisesta oma Qortali nimi:`);
    if (qortalName && qortalName.trim() !== "") {
      // Simuleerime sisselogimist
      setIsLoggedIn(true);
      setCurrentUser({ name: qortalName.trim(), address: "QfakeAddress123" });
      alert(`Tere, ${qortalName.trim()}! Suunatakse lehele ${targetPath} (simuleeritud sisselogimine).`);
      navigate(targetPath);
    } else {
      alert("Nimi on vajalik sisu lisamiseks ja toimingu jätkamiseks.");
    }
  };

  // console.log("AppContent render: isLoggedIn:", isLoggedIn, "Laulude arv:", songs.length);

  return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginLogoutClick={handleToggleLoginLogout}
        onSearchSubmit={actualSearchHandler}
        onNavigateToAction={handleNavigateToAction}
      />
      <div className="content-wrapper">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage songs={songs} onSongSelect={handleSelectSong} />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route
              path="/add-music"
              element={isLoggedIn ? <AddMusicPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/create-playlist"
              element={isLoggedIn ? <CreatePlaylistPage /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<div><h2>404 Lehte ei leitud</h2><Link to="/">Mine avalehele</Link></div>} />
          </Routes>
        </main>
        {/* Külgriba on siit eemaldatud vastavalt varasemale otsusele */}
      </div>
      <Player currentSong={selectedSong} />
    </div>
  );
}

export default App;