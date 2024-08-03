// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExplorePage from './pages/ExplorePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import AboutPage from './pages/AboutPage';
import NavBar from './components/NavBar';
import SettingsPage from './pages/SettingsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
