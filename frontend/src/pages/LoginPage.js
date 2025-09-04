import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated, setUserRole }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5002/api/auth/login', formData);
      if (res && res.data) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.user.role);
        setIsAuthenticated(true);
        setUserRole(res.data.user.role);

        // Redirect based on user role
        if (res.data.user.role === 'admin') {
          navigate('/admin');
        } else if (res.data.user.role === 'patient') {
          navigate('/patient/dashboard');
        } else if (res.data.user.role === 'doctor') {
          navigate('/doctor/dashboard');
        }
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="p-4 border rounded shadow-sm">
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
