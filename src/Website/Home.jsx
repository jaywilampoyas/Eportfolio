import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../CSS/Home.css';
import useDocumentTitle from '../useDocumentTitle';

function Home() {
  useDocumentTitle('Home');
  const navigate = useNavigate();

  return (
      <div className="home-container">
        <div className="intro-section updated-intro">
          <div className="intro-text">
            <h1 className="intro-name pop-delay-1">
              I AM <br /> JAYWIL L. AMPOYAS
            </h1>
            <p className="intro-title pop-delay-2">Aspiring Full-Stack Developer</p>
            <p className="intro-quote pop-delay-3">
              I enjoy turning ideas into real-world <br /> applications that are functional and visually engaging.
            </p>
          </div>
          <div className="intro-image">
            <img src="/images/jaywil.jpg" alt="Jaywil Ampoyas" />
          </div>
        </div>

        <div className="cta-section">
          <p className="cta-message">
            Feel free to explore my work and connect with me through my social links below!
          </p>

          <ButtonGroup className="cta-buttons" aria-label="Portfolio navigation">
            <Button variant="dark" onClick={() => navigate('/education')}>Education</Button>
            <Button variant="dark" onClick={() => navigate('/skills')}>Skills</Button>
            <Button variant="dark" onClick={() => navigate('/projects')}>Projects</Button>
            <Button variant="dark" onClick={() => navigate('/experience')}>Experience</Button>
            <Button variant="dark" onClick={() => navigate('/achievements')}>Achievements</Button>
          </ButtonGroup>
        </div>
      </div>
  );
}

export default Home;
