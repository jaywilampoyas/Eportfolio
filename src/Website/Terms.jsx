import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../Website/Navbar';
import useDocumentTitle from '../useDocumentTitle';
import '../CSS/Terms.css';

function Terms() {
  useDocumentTitle('Terms of Service');

  return (
    <>
      <Navbar />
      <Container className="terms-container">
        <h2>Terms of Service</h2>
        <p><strong>Effective Date:</strong> August 3, 2025</p>

        <ul>
          <li>
            <strong>Use of Content:</strong> All content on this website, including text, images, projects, and code snippets,
            is owned by Jaywil Ampoyas unless stated otherwise. You may not copy, reproduce,
            or use any material without permission.
          </li>
          <li>
            <strong>Portfolio Purpose:</strong> This website is designed for showcasing my personal projects,
            experience, and skills. It is not intended for commercial use.
          </li>
          <li>
            <strong>Contact and Communication:</strong> If you use the contact form or reach out through email or social media links,
            you agree to communicate respectfully and not misuse the contact features for spam or malicious intent.
          </li>
          <li>
            <strong>Limitation of Liability:</strong> I make every effort to keep this website accurate and secure. However,
            I am not responsible for any loss, damage, or inconvenience resulting from your use of this site.
          </li>
          <li>
            <strong>Changes to Terms:</strong> I may update these terms from time to time. Continued use of the site means you accept any updates or changes.
          </li>
        </ul>
      </Container>
    </>
  );
}

export default Terms;
