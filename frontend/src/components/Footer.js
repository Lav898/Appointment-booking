import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="text-center">
          <Col md={4} className="mb-3">
            <h5>About Us</h5>
            <p>
              Your trusted partner in healthcare management. We provide a seamless
              platform for patients, doctors, and administrators.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About</a></li>
              <li><a href="/register" className="text-white text-decoration-none">Register</a></li>
              <li><a href="/login" className="text-white text-decoration-none">Login</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="#" className="text-white mx-2"><FaFacebook size={24} /></a>
              <a href="#" className="text-white mx-2"><FaTwitter size={24} /></a>
              <a href="#" className="text-white mx-2"><FaLinkedin size={24} /></a>
              <a href="#" className="text-white mx-2"><FaInstagram size={24} /></a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p className="mb-0">&copy; 2024 Patient Care Dashboard. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;