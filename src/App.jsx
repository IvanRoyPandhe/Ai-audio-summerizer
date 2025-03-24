import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Pricing from './components/Pricing/Pricing';
import Footer from './components/Footer/Footer';
import Recording from './pages/Recording/Recording';
import History from './pages/History/History';
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
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/record" element={<Recording />} />
          <Route path="/history" element={<History />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
