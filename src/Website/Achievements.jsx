import React, { useEffect, useState } from 'react';
import '../CSS/Achievements.css';
import useDocumentTitle from '../useDocumentTitle';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

function Achievements() {
  useDocumentTitle('Achievements');

  const [achievements, setAchievements] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const achCollection = collection(db, 'Achievements');
        const snapshot = await getDocs(achCollection);
        const achData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAchievements(achData);
      } catch (error) {
        console.error('Error fetching achievement data:', error);
      }
    };

    fetchAchievements();
  }, []);

  const linkify = (text) => {
    const urlRegex = /((https?:\/\/|www\.)[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      const href = url.startsWith('http') ? url : `https://${url}`;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  };

  const formatDescription = (text) => {
    if (!text) return '';
    const escapedText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const withLinks = linkify(escapedText);
    return withLinks
      .split('\n')
      .map(line => `<p>${line.trim()}</p>`)
      .join('');
  };

  const openImageModal = (imgUrl) => setSelectedImage(imgUrl);
  const closeImageModal = () => setSelectedImage(null);

  return (
    <div className="achievements-container">
      <h2 className="achievements-title">My Achievements</h2>
      <p className="achievements-description">
        Celebrating academic excellence and creative milestones throughout the years.
      </p>

      <div className="achievements-list">
        {achievements.map(ach => (
          <div key={ach.id} className="achievements-card">
            <h3 className="achievements-entry-title">{ach.title}</h3>

            <div
              className="achievements-entry-description"
              dangerouslySetInnerHTML={{ __html: formatDescription(ach.description) }}
            />

            {Array.isArray(ach.images) && ach.images.length > 0 && (
              <div className="achievements-images">
                {ach.images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`achievement-${index}`}
                    className="achievements-image"
                    onClick={() => openImageModal(imgUrl)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage} alt="Full View" className="modal-image" />
            <button className="close-button" onClick={closeImageModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Achievements;
