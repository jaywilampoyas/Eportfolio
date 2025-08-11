import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import '../CSS/Dashboard.css';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import useDocumentTitle from '../useDocumentTitle';

function Dashboard() {
  useDocumentTitle('Dashboard');

  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const [contact, setContact] = useState({
    email: '',
    phone: '',
    facebook: { name: '', url: '' },
    instagram: { name: '', url: '' },
    twitter: { name: '', url: '' },
    github: { name: '', url: '' },
    linkedin: { name: '', url: '' }
  });

  const [post, setPost] = useState({
    title: '',
    description: '',
    images: [],
    category: 'Skills'
  });

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(base64Images => {
      setPost(prev => ({
        ...prev,
        images: [...prev.images, ...base64Images]
      }));
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const postId = `${Date.now()}`;
      await setDoc(doc(db, post.category, postId), {
        ...post,
        timestamp: new Date(),
        userId: user.uid
      });
      alert(`Post added to ${post.category} successfully!`);
      setPost({ title: '', description: '', images: [], category: 'Skills' });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login', { replace: true });
      } else {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContact(prev => ({ ...prev, ...docSnap.data().contact }));
        }
      }
    });
    return () => unsubscribe();
  }, [navigate, auth, db]);

  useEffect(() => {
    const preventBack = () => {
      window.history.pushState(null, '', window.location.href);
    };
    preventBack();
    window.addEventListener('popstate', preventBack);
    return () => window.removeEventListener('popstate', preventBack);
  }, []);

  useEffect(() => {
    let timeout;
    const logoutUser = () => {
      signOut(auth).then(() => {
        navigate('/login', { replace: true });
      });
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logoutUser, 5 * 60 * 1000); // 5 minutes
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeout);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [auth, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [social, field] = name.split('.');
      setContact((prev) => ({
        ...prev,
        [social]: { ...prev[social], [field]: value }
      }));
    } else {
      setContact((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, 'contacts', user.uid), { contact });
      alert('Contact information saved successfully!');
    }
  };

  return (
      <Container className="dashboard-unique-page-wrapper mt-4">
        <div className="dashboard-unique-header-row text-center mb-4">
          <h1>Welcome to Your Dashboard, Jaywil!</h1>
          <p>This is your personal space where you can manage and review your portfolio content.</p>
        </div>

        <Row className="justify-content-center gx-5 gy-5">

              <div className="text-center mb-4">
        <Button
          variant="info"
          className="contents-btn"
          onClick={() => navigate('/edit')}
        >
          📂 Contents
        </Button>
      </div>

          <Col md={6}>
            <Card className="p-4 dashboard-unique-post-card">
              <h4 className="mb-4">Create New Post</h4>
              <Form onSubmit={handlePostSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handlePostChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={post.description}
                    onChange={handlePostChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Images</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  {post.images.length > 0 && (
                    <div className="mt-3 d-flex flex-wrap gap-2 dashboard-unique-image-preview">
                      {post.images.map((imgSrc, index) => (
                        <img
                          key={index}
                          src={imgSrc}
                          alt={`preview-${index}`}
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '0.5rem'
                          }}
                          className="dashboard-unique-image-thumb"
                        />
                      ))}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={post.category}
                    onChange={handlePostChange}
                  >
                    <option value="Skills">Skills</option>
                    <option value="Projects">Projects</option>
                    <option value="Experience">Experience</option>
                    <option value="Achievements">Achievements</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100 dashboard-unique-submit-btn">
                  Submit Post
                </Button>
              </Form>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-4 dashboard-unique-contact-card">
              <h4 className="mb-4">Contact Information</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={contact.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <hr />
                <h5>Social Media Links</h5>

                {["facebook", "instagram", "twitter", "github", "linkedin"].map((platform) => (
                  <Form.Group key={platform}>
                    <Form.Label>
                      {platform === "facebook" && <FaFacebook />}
                      {platform === "instagram" && <FaInstagram />}
                      {platform === "twitter" && <FaTwitter />}
                      {platform === "github" && <FaGithub />}
                      {platform === "linkedin" && <FaLinkedin />}
                      {` ${platform.charAt(0).toUpperCase() + platform.slice(1)} Name & URL`}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name={`${platform}.name`}
                      placeholder="Page Name"
                      value={contact[platform].name}
                      onChange={handleChange}
                    />
                    <Form.Control
                      type="url"
                      name={`${platform}.url`}
                      placeholder="Page URL"
                      value={contact[platform].url}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </Form.Group>
                ))}

                <Button variant="success" type="submit" className="mt-3 w-100 dashboard-unique-submit-btn">
                  Save Contact Info
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default Dashboard;
