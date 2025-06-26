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
// import useAuth from './hooks/useAuth';


// App komponent on välimine kest
function App() {
  console.log("App komponent renderdab AppContent'i"); // Lisa see log testiks
  return (
    <AppContent />
  );
}

function AppContent() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(initialMockSongs);
    console.log("AppContent useEffect: Laulud laetud mock-andmetest");
  }, []); // Tühi sõltuvuste massiiv on siin korrektne

  // Handlerid on veel väljas

  console.log("AppContent: useEffect lisatud, laulude arv peaks olema > 0");

  return (
    <div className="app-container"  style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1>Tere, Maailm! (AppContent töötab useEffectiga)</h1>
      <p>Praegune isLoggedIn: {isLoggedIn.toString()}</p>
      <p>Laulude arv: {songs.length}</p> {/* Nüüd peaks siin olema mock-laulude arv */}
      {/* Võid proovida ka laulude nimesid kuvada, et veenduda, et andmed on olemas */}
      {/* {songs.length > 0 && <ul>{songs.map(s => <li key={s.id}>{s.title}</li>)}</ul>} */}
    </div>
  );
}

export default App;