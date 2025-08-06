import React, { useEffect, useState } from 'react';
import '../CSS/Projects.css';
import useDocumentTitle from '../useDocumentTitle';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

function Projects() {
  useDocumentTitle('Projects');

  const [projects, setProjects] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projCollection = collection(db, 'Projects');
        const snapshot = await getDocs(projCollection);
        const projData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projData);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjects();
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
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      <p className="projects-description">
        A selection of software projects showcasing my skills and development experience.
      </p>

      <div className="projects-list">
        {projects.map(project => (
          <div key={project.id} className="projects-card">
            <h3 className="projects-entry-title">{project.title}</h3>

            <div
              className="projects-entry-description"
              dangerouslySetInnerHTML={{ __html: formatDescription(project.description) }}
            />

            {Array.isArray(project.images) && project.images.length > 0 && (
              <div className="projects-images">
                {project.images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`project-${index}`}
                    className="projects-image"
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

export default Projects;
