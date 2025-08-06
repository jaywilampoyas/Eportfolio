import React, { useEffect, useState } from 'react';
import '../CSS/Experience.css';
import useDocumentTitle from '../useDocumentTitle';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

function Experience() {
  useDocumentTitle('Experience');

  const [experiences, setExperiences] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // modal image

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const expCollection = collection(db, 'Experience');
        const snapshot = await getDocs(expCollection);
        const expData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setExperiences(expData);
      } catch (error) {
        console.error('Error fetching experience data:', error);
      }
    };

    fetchExperiences();
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
    <div className="experience-container">
      <h2 className="experience-title">My Experience</h2>
      <p className="experience-description">
        A look at the projects and organizations I've worked with to sharpen my real-world skills and apply my technical knowledge.
      </p>

      <div className="experience-list">
        {experiences.map(exp => (
          <div key={exp.id} className="experience-card">
            <h3 className="experience-entry-title">{exp.title}</h3>

            <div
              className="experience-entry-description"
              dangerouslySetInnerHTML={{ __html: formatDescription(exp.description) }}
            />

            {Array.isArray(exp.images) && exp.images.length > 0 && (
              <div className="experience-images">
                {exp.images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`experience-${index}`}
                    className="experience-image"
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

export default Experience;
