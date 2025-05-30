import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Pricing from './components/Pricing/Pricing';
import Footer from './components/Footer/Footer';
import Recording from './pages/Recording/Recording';
import History from './pages/History/History';
import Login from './components/Login/Login';
import Welcome from './components/Welcome/Welcome';
import './App.css';

const Home = () => (
  <>
    <Hero />
    <Features />
    <HowItWorks />
    <Pricing />
  </>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (username) => {
    setUser({ username });
  };

  const handleContinue = () => {
    setShowLogin(true);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {user ? (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/record" element={<Recording />} />
              <Route path="/history" element={<History />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path="*" element={
              showLogin ? 
              <Login onLogin={handleLogin} /> : 
              <Welcome onContinue={handleContinue} />
            } />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
