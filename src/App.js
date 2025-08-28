import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PlacementNews from './pages/PlacementNews';
import TechEventNews from './pages/TechEventNews';
import CulturalEventNews from './pages/CulturalEventNews';
import CutoffNews from './pages/CutoffNews';
import HotNews from './pages/HotNews';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SignInSignUp from './pages/SignInSignUp';
import VerifyEmail from './pages/VerifyEmail';
// --- 1. Import the new page ---
import RecommendedPage from './pages/RecommendedPage'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/placement-news" element={<PlacementNews />} />
        <Route path="/tech-event-news" element={<TechEventNews />} />
        <Route path="/cultural-event-news" element={<CulturalEventNews />} />
        <Route path="/cutoffs-and-related-news" element={<CutoffNews />} />
        <Route path="/hot-news" element={<HotNews />} />
        <Route path="/login" element={<SignInSignUp />} />
        <Route path="/register" element={<SignInSignUp />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* --- 2. Add the new route --- */}
        <Route path="/recommended-for-you" element={<RecommendedPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
