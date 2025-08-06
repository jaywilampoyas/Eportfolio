import React from 'react';
import '../CSS/Education.css';
import useDocumentTitle from '../useDocumentTitle';

function Education() {
  useDocumentTitle('Education');

  return (
    <div className="education-container">
      <h2 className="education-title">My Educational Background</h2>
      <p className="education-description">
        Below is a summary of my academic journey, highlighting the programs I completed in the field of Information Technology with a focus on mobile app and web development.
      </p>

<div className="education-card">
  <div className="education-header">
    <h3 className="education-degree">Bachelor of Science in Information Technology (BSIT)</h3>
    <span className="education-year">2021 - 2025</span>
  </div>
  <p className="education-school">STI West Negros University</p>
  <p className="education-detail">
    This program provided me with a solid foundation in computer systems, software development, networking, and database management. I gained hands-on experience building full-stack web applications, learning about systems analysis, cloud computing, and project management. It further strengthened my problem-solving and critical thinking skills in real-world IT environments.
  </p>
</div>

<div className="education-card">
  <div className="education-header">
    <h3 className="education-degree">Information Technology in Mobile App and Web Development (ITMAWD)</h3>
    <span className="education-year">2019 - 2021</span>
  </div>
  <p className="education-school">STI West Negros University</p>
  <p className="education-detail">
    This specialized senior high school track introduced me to the fundamentals of mobile app and web development. I learned essential programming languages like HTML, CSS, and JavaScript, along with basic mobile frameworks. This early exposure shaped my passion for software development and gave me a head start in building responsive and user-friendly applications.
  </p>
</div>
    </div>
  );
}

export default Education;
