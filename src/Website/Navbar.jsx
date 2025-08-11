import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import '../CSS/Navbar.css';

function CustomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  // Added '/edit' to hidden paths so navbar won't show there
  const hiddenPaths = ['/login', '/edit'];

  const [expanded, setExpanded] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  // Visitor Count Logic (only fetch if in dashboard)
  useEffect(() => {
    const incrementVisitorCount = async () => {
      try {
        const visitsRef = doc(db, "analytics", "visits");
        const docSnap = await getDoc(visitsRef);

        if (docSnap.exists()) {
          await updateDoc(visitsRef, { count: increment(1) });
          const updatedDoc = await getDoc(visitsRef);
          setVisitorCount(updatedDoc.data().count);
        } else {
          await setDoc(visitsRef, { count: 1 });
          setVisitorCount(1);
        }
      } catch (error) {
        console.error("Error updating visitor count:", error);
      }
    };

    if (location.pathname === '/dashboard') {
      incrementVisitorCount();
    }
  }, [location.pathname]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      signOut(auth)
        .then(() => {
          navigate('/login', { replace: true });
        })
        .catch((error) => {
          console.error('Logout Error:', error);
        });
    }
  };

  const hideNavLinks = hiddenPaths.includes(location.pathname);

  // If current path is in hiddenPaths, don't render the Navbar at all
  if (hideNavLinks) {
    return null;
  }

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className={`custom-navbar ${expanded ? 'navbar-open' : ''}`}
      fixed="top"
      expanded={expanded}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="brand">
          <img src="/favicon.png" alt="Logo" className="brand-logo" />
          <span className="brand-text">Jaywil L. Ampoyas</span>
        </Navbar.Brand>

        {/* Visitor Count - only visible on dashboard */}
        {location.pathname === '/dashboard' && (
          <div className="visitor-count">
            👥 {visitorCount} views
          </div>
        )}

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleToggle}
          className="custom-toggler"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto nav-links">
            {location.pathname !== '/dashboard' && (
              <>
                <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)} className="nav-animate">Home</Nav.Link>
                <Nav.Link as={Link} to="/education" onClick={() => setExpanded(false)} className="nav-animate">Education</Nav.Link>
                <Nav.Link as={Link} to="/skills" onClick={() => setExpanded(false)} className="nav-animate">Skills</Nav.Link>
                <Nav.Link as={Link} to="/projects" onClick={() => setExpanded(false)} className="nav-animate">Projects</Nav.Link>
                <Nav.Link as={Link} to="/experience" onClick={() => setExpanded(false)} className="nav-animate">Experience</Nav.Link>
                <Nav.Link as={Link} to="/achievements" onClick={() => setExpanded(false)} className="nav-animate">Achievements</Nav.Link>
              </>
            )}

            {location.pathname === '/dashboard' && (
              <Button
                variant="outline-light"
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
