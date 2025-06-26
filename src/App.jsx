import React, { useState, useEffect } from 'react';
// import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
// import Header from './components/Header';
// import Player from './components/Player';
import HomePage from './pages/HomePage';
// import AddMusicPage from './pages/AddMusicPage';
// import CreatePlaylistPage from './pages/CreatePlaylistPage';
// import SearchResultsPage from './pages/SearchResultsPage';
import { songs as initialMockSongs } from './data/mockSongs'; // Muutsin nime, et vältida konflikti 'songs' state'iga
import './App.css';
import { useNavigate } from 'react-router-dom'; // Assuming useNavigate is used
// import useAuth from './hooks/useAuth';


// App komponent on välimine kest
function App() {
  console.log("App komponent renderdab AppContent'i"); // Lisa see log testiks
  return (
    <AppContent />
  );
}

function AppContent() {
  // ... (sinu AppContent kood koos olekute ja JSX-iga) ...
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Näide
  const [songs, setSongs] = useState([]); // Näide

  console.log("AppContent renderdub. isLoggedIn:", isLoggedIn, "Songs length:", songs.length); // Lisa see log

  return (
    <div className="app-container" style={{ padding: '20px', backgroundColor: '#f0f0f0', border: '5px solid red' /* AJUTINE ÄÄRIS TESTIMISEKS */ }}>
      <h1>Tere, Maailm! (AppContent töötab olekutega)</h1>
      <p>Praegune isLoggedIn: {isLoggedIn.toString()}</p>
      <p>Laulude arv: {songs.length}</p>
      <p style={{color: 'blue', fontSize: '20px'}}>KAS SEE TEKST ILMUB?</p> {/* Veel üks testelement */}
    </div>
  );
}

export default App;