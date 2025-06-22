// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <--- LISA SEE IMPORT
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* <--- ÜMBRITSE App SELLEGA */}
      <App />
    </BrowserRouter> {/* <--- ÄRA UNUSTA LÕPUTAGI */}
  </StrictMode>
);