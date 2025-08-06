import React, { useEffect, useState } from 'react';
import '../CSS/Skills.css';
import useDocumentTitle from '../useDocumentTitle';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

function Skills() {
  useDocumentTitle('Skills');

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsCollection = collection(db, 'Skills');
        const snapshot = await getDocs(skillsCollection);
        const skillsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSkills(skillsData);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="skills-container">
      <h2 className="skills-title">My Tech Skills</h2>
      <p className="skills-description">
        Below is a collection of technical skills I've acquired and applied in various projects. Each skill represents a tool or technology I'm proficient in and passionate about using to solve real-world problems.
      </p>
      <div className="skills-list">
        {skills.map(skill => (
          <div key={skill.id} className="skill-card">
            <h3 className="skill-title">{skill.title}</h3>
            <p className="skill-description">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
