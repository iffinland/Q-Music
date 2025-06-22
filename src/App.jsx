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
// import { useNavigate } from 'react-router-dom'; // Assuming useNavigate is used
// import useAuth from './hooks/useAuth';


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

// src/App.jsx (kus on AppContent defineeritud)
// ... (impordid)

function AppContent({ /* ...muud propsid... */ }) {
  const navigate = useNavigate();

  // Autentimise olekud on siin defineeritud
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  // ... (muud sinu olekud nagu songs, selectedSong jne) ...


  const handleNavigateToAction = async (targetPath) => {
    if (isLoggedIn && currentUser) { // Kasutab siin defineeritud isLoggedIn ja currentUser
      navigate(targetPath);
      return;
    }
    const qortalName = prompt("Palun sisesta oma Qortali nimi testimiseks:");
    if (qortalName && qortalName.trim() !== "") {
      setIsLoggedIn(true); // Kasutab siin defineeritud setIsLoggedIn
      setCurrentUser({ name: qortalName.trim(), address: "QfakeAddress123" }); // Kasutab siin defineeritud setCurrentUser
      alert(`Tere, ${qortalName.trim()}! Suunatakse lehele ${targetPath} (sim sisselogimine).`);
      navigate(targetPath);
    } else {
      alert("Nimi on vajalik sisu lisamiseks.");
    }
  };

  // handleToggleLoginLogout funktsioon, mis kasutab neid samu olekuid
  const handleToggleLoginLogout = () => {
    if (isLoggedIn) {
      // handleLogout loogika
      setIsLoggedIn(false);
      setCurrentUser(null);
      alert("Välja logitud.");
    } else {
      // handleLogin loogika (praegu on see osa handleNavigateToAction sees, aga võiks olla ka eraldi)
      // Simuleerime sisselogimist, kui see nupp on eraldi
      const qortalName = prompt("Palun sisesta oma Qortali nimi sisselogimiseks:");
      if (qortalName && qortalName.trim() !== "") {
        setIsLoggedIn(true);
        setCurrentUser({ name: qortalName.trim(), address: "QfakeAddress123" });
        alert(`Tere tulemast, ${qortalName.trim()}! (Simuleeritud)`);
      }
    }
  };

    const actualSearchHandler = (searchTerm) => {
    // Add your search logic here
    console.log("Performing search for:", searchTerm);
  };

  // ... (ülejäänud AppContent JSX ja funktsioonid) ...
  // Headerile edastad siis siin defineeritud isLoggedIn, currentUser, handleToggleLoginLogout
   return (
    <div className="app-container">
      <Header
        isLoggedIn={isLoggedIn} // Siit
        currentUser={currentUser} // Siit
        onLoginLogoutClick={handleToggleLoginLogout} // Siit
        onSearchSubmit={actualSearchHandler} // Sinu otsingukäitleja
        onNavigateToAction={handleNavigateToAction}
      />
      {/* ... */}
    </div>
  );
}

export default App; // Make sure this line exists and is exporting your main component.