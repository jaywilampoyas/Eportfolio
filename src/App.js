import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Website pages
import Home from './Website/Home';
import Education from './Website/Education';
import Skills from './Website/Skills';
import Projects from './Website/Projects';
import Experience from './Website/Experience';
import Achievements from './Website/Achievements';
import CustomNavbar from './Website/Navbar';
import Footer from './Website/footer';
import Terms from './Website/Terms';
import Policy from './Website/Policy';

// Admin pages
import Dashboard from './Admin/Dashboard';
import Login from './Admin/Login';
import Edit from './Admin/Edit';

import { FaArrowUp } from 'react-icons/fa';
import './CSS/Home.css'; // Optional: for back-to-top styles

function AppContent() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 100);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hideFooter = location.pathname === '/login' || location.pathname === '/dashboard' || location.pathname === '/edit';

  // Map each route to its corresponding section title
  const routeTitles = {
    '/': 'Home',
    '/education': 'Education',
    '/skills': 'Skills',
    '/projects': 'Projects',
    '/experience': 'Experience',
    '/achievements': 'Achievements',
  };

  const currentTitle = routeTitles[location.pathname];

  return (
    <>
      <CustomNavbar />

      {/* Section Title shown on left and scrolls with page */}
      {currentTitle && (
        <div className="title-wrapper">
          <div className="left-page-title">
            <h1>{currentTitle}</h1>
          </div>
        </div>
      )}

      <Routes>
        {/* Website Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Education />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/policy" element={<Policy />} />

        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>

      {/* Back to Top Button */}
      <button
        className={`back-to-top-button ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>

      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
