import React, { useEffect, useState } from "react";
import {  Container,  Row,  Col,  Card,  Button,  Spinner,  Modal,  Form,  Carousel, } from "react-bootstrap";
import {  getDocs,  collection,  doc,  deleteDoc,  setDoc, updateDoc, } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../CSS/Edit.css";

function Edit() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [archivedSkills, setArchivedSkills] = useState([]);
  const [archivedProjects, setArchivedProjects] = useState([]);
  const [archivedExperience, setArchivedExperience] = useState([]);
  const [archivedAchievements, setArchivedAchievements] = useState([]);

  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState("");
  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    images: [],
  });

  const navigate = useNavigate();

  // 🔹 Redirect if not logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // 🔹 Fetch Firestore data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const skillsSnap = await getDocs(collection(db, "Skills"));
      const projectsSnap = await getDocs(collection(db, "Projects"));
      const experienceSnap = await getDocs(collection(db, "Experience"));
      const achievementsSnap = await getDocs(collection(db, "Achievements"));

      setSkills(skillsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setProjects(projectsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setExperience(experienceSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setAchievements(achievementsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      const archivedSkillsSnap = await getDocs(collection(db, "Archived_Skills"));
      const archivedProjectsSnap = await getDocs(collection(db, "Archived_Projects"));
      const archivedExperienceSnap = await getDocs(collection(db, "Archived_Experience"));
      const archivedAchievementsSnap = await getDocs(collection(db, "Archived_Achievements"));

      setArchivedSkills(archivedSkillsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setArchivedProjects(archivedProjectsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setArchivedExperience(archivedExperienceSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setArchivedAchievements(archivedAchievementsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleEdit = (type, item) => {
    setEditType(type);
    setEditId(item.id);
    setEditData({
      title: item.title || "",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      images: Array.isArray(item.images) ? item.images : [],
    });
    setShowEditModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditData((prev) => ({
        ...prev,
        imageUrl: reader.result,
        images: [...prev.images, reader.result],
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index = null) => {
    if (index === null) {
      setEditData((prev) => ({ ...prev, imageUrl: "", images: [] }));
    } else {
      setEditData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateDoc(doc(db, editType, editId), {
        title: editData.title,
        description: editData.description,
        imageUrl: editData.imageUrl,
        images: editData.images,
      });
      alert("Item updated successfully");
      setShowEditModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  const handleArchive = async (type, id, item) => {
    if (window.confirm("Are you sure you want to archive this item?")) {
      const archiveCollection = `Archived_${type}`;
      await setDoc(doc(db, archiveCollection, id), item);
      await deleteDoc(doc(db, type, id));
      alert(`${type} archived`);
      window.location.reload();
    }
  };

  const handleRemoveFromArchive = async (type, id, item) => {
    if (window.confirm("Restore this item?")) {
      const activeCollection = type.replace("Archived_", "");
      await setDoc(doc(db, activeCollection, id), item);
      await deleteDoc(doc(db, type, id));
      alert(`Restored to ${activeCollection}`);
      window.location.reload();
    }
  };

  const getImagesFromItem = (item) => {
    let imgs = [];
    if (item.imageUrl) imgs.push(item.imageUrl);
    if (Array.isArray(item.images)) imgs = imgs.concat(item.images);
    return imgs.filter(Boolean);
  };

  const renderSection = (title, data, type) => (
    <div className="edit-section">
      <h3 className="edit-section-title">{title}</h3>
      <Row>
        {data.map((item) => {
          const images = getImagesFromItem(item);
          return (
            <Col xs={12} md={6} lg={4} key={item.id} className="mb-3">
              <Card className="edit-card">
                {images.length > 0 ? (
                  images.length === 1 ? (
                    <Card.Img
                      variant="top"
                      src={images[0]}
                      alt={item.title || "Image"}
                      className="edit-card-img"
                      style={{ height: "180px", objectFit: "cover" }} // 🔹 smaller image
                    />
                  ) : (
                    <Carousel interval={null} className="edit-card-carousel">
                      {images.map((img, idx) => (
                        <Carousel.Item key={idx}>
                          <img
                            className="d-block w-100 edit-card-img"
                            src={img}
                            alt={`${item.title || "Image"}-${idx + 1}`}
                            style={{ height: "180px", objectFit: "cover" }} // 🔹 smaller image
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  )
                ) : (
                  <div className="text-muted text-center py-5">
                    No image available
                  </div>
                )}
                <Card.Body>
                  <Card.Title>{item.title || "Untitled"}</Card.Title>
                  <Card.Text>{item.description || "No description"}</Card.Text>
                  <div className="edit-card-buttons">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(type, item)}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      className="archive-btn"
                      size="sm"
                      onClick={() => handleArchive(type, item.id, item)}
                    >
                      🗄 Archive
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );

  const renderArchiveSection = (title, data, type) => (
    <div className="edit-section">
      <h4>{title}</h4>
      {data.length === 0 ? (
        <p>No archived items</p>
      ) : (
        <ul>
          {data.map((item) => {
            const images = getImagesFromItem(item);
            return (
              <li key={item.id} style={{ marginBottom: "10px" }}>
                <strong>{item.title || "Untitled"}</strong>
                {images.length > 0 &&
                  images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={item.title || "Image"}
                      style={{ height: "40px", marginLeft: "10px" }}
                    />
                  ))}
                <Button
                  variant="success"
                  size="sm"
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleRemoveFromArchive(type, item.id, item)}
                >
                  ♻ Restore
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <Container fluid className="edit-page">
      <div className="exit-button-container">
        <Button
          variant="info"
          className="archive-btn"
          onClick={() => setShowArchiveModal(true)}
        >
          📦 View Archive
        </Button>
        <Button
          variant="outline-light"
          className="exit-button"
          onClick={() => navigate("/dashboard")}
        >
          ❌ Exit
        </Button>
      </div>

      {renderSection("Skills", skills, "Skills")}
      {renderSection("Projects", projects, "Projects")}
      {renderSection("Experience", experience, "Experience")}
      {renderSection("Achievements", achievements, "Achievements")}

      {/* Archive Modal */}
      <Modal
        show={showArchiveModal}
        onHide={() => setShowArchiveModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Archived Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderArchiveSection("Skills", archivedSkills, "Archived_Skills")}
          {renderArchiveSection("Projects", archivedProjects, "Archived_Projects")}
          {renderArchiveSection("Experience", archivedExperience, "Archived_Experience")}
          {renderArchiveSection("Achievements", archivedAchievements, "Archived_Achievements")}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowArchiveModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="editDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />
            </Form.Group>

            {editData.images.length > 0 && (
              <div className="mb-3 text-center">
                {editData.images.map((img, idx) => (
                  <div key={idx} style={{ marginBottom: "10px" }}>
                    <img
                      src={img}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        marginBottom: "5px",
                      }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveImage(idx)}
                    >
                      🗑 Remove Image
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Form.Group controlId="editImage" className="mb-3">
              <Form.Label>
                {editData.images.length > 0 ? "Add More Images" : "Add Image"}
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            💾 Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Edit;