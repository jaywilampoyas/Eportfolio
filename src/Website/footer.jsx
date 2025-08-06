import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import {
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';
import '../CSS/footer.css';

function Footer() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contacts'));
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setContact(data.contact ?? data);
        } else {
          console.warn('⚠️ No contact documents found in Firestore');
        }
      } catch (error) {
        console.error('🔥 Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h4 className="footer-title">Contact Information</h4>

        {contact && (
          <div className="footer-contact">
            {contact.email && (
              <p>
                <FaEnvelope />{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            )}
            {contact.phone && (
              <p>
                <FaPhone />{' '}
                <a href={`tel:${contact.phone}`}>Call {contact.phone}</a>{' '}
                | <a href={`sms:${contact.phone}`}>Text</a>
              </p>
            )}

            <div className="footer-links">
              {contact.facebook && (
                <a href={contact.facebook.url} target="_blank" rel="noopener noreferrer">
                  <FaFacebook /> {contact.facebook.name}
                </a>
              )}
              {contact.twitter && (
                <a href={contact.twitter.url} target="_blank" rel="noopener noreferrer">
                  <FaTwitter /> {contact.twitter.name}
                </a>
              )}
              {contact.instagram && (
                <a href={contact.instagram.url} target="_blank" rel="noopener noreferrer">
                  <FaInstagram /> {contact.instagram.name}
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin.url} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin /> {contact.linkedin.name}
                </a>
              )}
              {contact.github && (
                <a href={contact.github.url} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> {contact.github.name}
                </a>
              )}
            </div>
          </div>
        )}

        <div className="footer-links-legal">
          <Link to="/terms">Terms of Service</Link> |{' '}
          <Link to="/policy">Privacy Policy</Link>
        </div>

        <div className="footer-copyright">
          © {new Date().getFullYear()} Jaywil Ampoyas. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
