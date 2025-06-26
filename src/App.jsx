import React, { useState, useEffect } from 'react';
// import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
// import Header from './components/Header';
// import Player from './components/Player';
// import HomePage from './pages/HomePage';
// import AddMusicPage from './pages/AddMusicPage';
// import CreatePlaylistPage from './pages/CreatePlaylistPage';
// import SearchResultsPage from './pages/SearchResultsPage';
// import { songs as initialMockSongs } from './data/mockSongs'; // Muutsin nime, et vältida konflikti 'songs' state'iga
import './App.css';
// import { useNavigate } from 'react-router-dom'; // Assuming useNavigate is used
// import useAuth from './hooks/useAuth';


// App komponent on välimine kest
function App() {
  return (
    <AppContent />
  );
}

function AppContent() {
  // const navigate = useNavigate(); // Kommenteeri välja, kui useNavigate pole imporditud

  // Kõik olekud (useState) praegu välja kommenteerida
  // const [selectedSong, setSelectedSong] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  // const [songs, setSongs] = useState([]);

  // useEffect ka välja kommenteerida
  // useEffect(() => {
  //   setSongs(initialMockSongs);
  // }, []);

  // Kõik handler-funktsioonid välja kommenteerida
  // const handleNavigateToAction = ...
  // const handleToggleLoginLogout = ...
  // const handleSelectSong = ...
  // const actualSearchHandler = ...

  console.log("AppContent renderdub nüüd väga lihtsalt!"); // Lisa see log

  return (
    <div className="app-container" style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1>Tere, Maailm! (AppContent töötab)</h1>
      <p>See on väga lihtsustatud vaade.</p>
      <p>Kui sa seda näed, siis `App` ja `AppContent` põhistruktuur on korras.</p>
    </div>
  );
}

export default App;