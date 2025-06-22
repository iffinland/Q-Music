// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'; // Impordi React Routeri komponendid
import Header from './components/Header';
import Player from './components/Player';
import SearchBox from './components/SearchBox';
import HomePage from './pages/HomePage';
import AddMusicPage from './pages/AddMusicPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

import { songs as mockSongsData } from './data/mockSongs'; // Mock andmed
import './App.css';

function App() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [songs, setSongs] = useState([]); // Hoiame laule siin

  // Lae mock-andmed (hiljem API-st)
  useEffect(() => {
    setSongs(mockSongsData); // Esialgu mock-andmed
    // TODO: Hiljem asenda see API kutsungiga Qortalist laulude saamiseks
    // async function fetchSongs() {
    //   try {
    //     // const response = await qortalApi.getSongs(); // Hüpoteetiline API kutse
    //     // setSongs(response.data);
    //   } catch (error) {
    //     console.error("Error fetching songs:", error);
    //     setSongs(mockSongsData); // Fallback to mock data on error
    //   }
    // }
    // fetchSongs();
  }, []);


  const handleLogin = () => { /* ... (jääb samaks) ... */
    setIsLoggedIn(true);
    setCurrentUser({ name: "TestKasutaja", profileLink: "/profile" }); // Lisa link profiilile
    alert("Oled nüüd (simuleeritult) sisse logitud!");
  };
  const handleLogout = () => { /* ... (jääb samaks) ... */
    setIsLoggedIn(false);
    setCurrentUser(null);
    alert("Oled välja logitud.");
  };
  const handleToggleLoginLogout = () => { /* ... (jääb samaks) ... */
    if (isLoggedIn) {
      handleLogout();
    } else {
      // Sisselogimisel võiks suunata avalehele või profiilile
      handleLogin();
    }
  };

  const handleSelectSong = (song) => {
    setSelectedSong(song);
  };

  // Navigeerimisfunktsioon AddMusicPage'ile
  // Seda saab Headerist kutsuda, aga parem on kasutada <Link> komponenti Headeris
  // const navigateToAddMusic = () => {
  //   // Selleks on vaja useNavigate hooki, aga lihtsam on Headeris Linki kasutada
  // };
  

    const handleSearch = (query) => {
    // TODO: Implementeeri otsinguloogika siin
    // See võib tähendada navigeerimist otsingutulemuste lehele
    // või olemasoleva nimekirja filtreerimist (kui andmed on juba laetud)
    alert(`Otsin: "${query}" (Funktsionaalsus tuleb hiljem)`);
    // Näiteks: navigate(`/search?q=${query}`); (kui kasutad React Routeri useNavigate hooki)
  };

    return (
    <Router>
      <div className="app-container">
        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLoginLogoutClick={handleToggleLoginLogout}
        />
        <div style={{ display: 'flex', flexGrow: 1 }}> {/* Flex konteiner sisu ja külgriba jaoks */}
          <main className="main-content" style={{ flexGrow: 1, padding: '1rem' }}>
            <Routes>
              {/* ... (sinu route'id) ... */}
            </Routes>
          </main>

          {/* PAREM KÜLGRIBA (Sidebar) - NÜÜD ALATI NÄHTAVAL */}
          <aside className="sidebar" style={{ width: '250px', padding: '1rem', borderLeft: '1px solid #ccc', backgroundColor: '#f9f9f9', minHeight: 'calc(100vh - KÕRGUS_HEADERIST_JA_PLAYERIST)' }}> {/* Lisasin minHeight, et see oleks alati täispikkuses */}
            {/* OTSINGUOSA LÄHEB SIIA */}

            {isLoggedIn && currentUser ? (
              // Sisselogitud kasutaja vaade külgribal
              <>
                <h3>Tere, {currentUser.name}!</h3>
                <nav>
                  <ul>
                    <li><Link to="/add-music">Lisa Muusikat</Link></li>
                    <li><Link to="/create-playlist">Loo Playlist</Link></li>
                    {/* <li><Link to="/profile">Minu Profiil</Link></li> */}
                  </ul>
                </nav>
                <p>Muu info/statistika sisselogitud kasutajale...</p>
              </>
            ) : (
              // Sisselogimata kasutaja vaade külgribal
              <>
                <h4>Statistika (Tuleb hiljem)</h4>
                <p>Audiofaile kokku: [Arv]</p>
                <p>Playliste kokku: [Arv]</p>
                <p>Sisuloojaid kokku: [Arv]</p>
                {/* Võid siia lisada ka sisselogimise nupu või viite */}
                {!isLoggedIn && (
                    <button onClick={handleToggleLoginLogout} style={{marginTop: '1rem'}}>
                        Logi sisse Qortaliga
                    </button>
                )}
              </>
            )}
          </aside>
        </div>
        <Player currentSong={selectedSong} />
      </div>
    </Router>
  );
}
export default App;