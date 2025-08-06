import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import '../CSS/Login.css';
import useDocumentTitle from '../useDocumentTitle';

function Login() {

  useDocumentTitle('Login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-main-content">
        <Container className="login-container d-flex justify-content-center align-items-center">
          <Row className="login-row w-100 justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <Card className="login-card shadow p-4">
                <Card.Body className="login-card-body">
                  <h3 className="login-title text-center mb-4">Login</h3>
                  {error && <Alert variant="danger" className="login-error-alert">{error}</Alert>}
                  <Form onSubmit={handleLogin} className="login-form">
                    <Form.Group className="login-form-group mb-3" controlId="formBasicEmail">
                      <Form.Label className="login-form-label">Email Address:</Form.Label>
                      <Form.Control
                        className="login-form-control"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="login-form-group mb-4" controlId="formBasicPassword">
                      <Form.Label className="login-form-label">Password:</Form.Label>
                      <Form.Control
                        className="login-form-control"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="login-submit-btn w-100">
                      Login
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;
