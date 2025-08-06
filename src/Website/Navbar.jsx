import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { getAuth, signOut } from 'firebase/auth';
import '../CSS/Navbar.css';

function CustomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const hiddenPaths = ['/login'];
  const [expanded, setExpanded] = useState(false);

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

        {!hideNavLinks && (
          <>
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
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
