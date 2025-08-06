import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../Website/Navbar';
import '../CSS/Policy.css';

function Policy() {
  return (
    <>
      <Navbar />
      <Container className="policy-container">
        <h2>Privacy Policy</h2>
        <p><strong>Effective Date:</strong> August 3, 2025</p>

        <p>Your privacy matters. This website is designed for viewing purposes only, and minimal data is collected. Here's how your privacy is respected:</p>

        <ul>
          <li><strong>Information Collection:</strong> This website does not collect any personally identifiable information. There are no contact forms, login systems, or interactive elements that ask for user data.</li>
          <li><strong>How Information Is Used:</strong> Since no personal information is collected, nothing is stored or used for any purpose. This site is purely informational and for showcasing my personal projects and work.</li>
          <li><strong>Data Protection:</strong> No user data is collected or stored by this site. Therefore, there is no risk of personal data breaches or misuse through this website.</li>
          <li><strong>Analytics & Cookies:</strong> This website may use basic analytics tools (e.g., Google Analytics or Firebase Analytics) to understand traffic and improve the site. These tools collect anonymous data such as device type, location (city-level), or time spent on pages — but do not identify you personally.</li>
          <li><strong>External Links:</strong> Links to external sites (such as GitHub, LinkedIn, or project demos) may be present. I am not responsible for the privacy practices of those third-party websites.</li>
          <li><strong>Your Rights:</strong> Since no personal data is collected, there's nothing to modify or delete. If you have questions or concerns, feel free to reach out through my public contact information.</li>
        </ul>
      </Container>
    </>
  );
}

export default Policy;
