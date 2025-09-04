import React from 'react';
import { Carousel, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomePage = () => {
  return (
    <Container className="my-4">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="https://media.istockphoto.com/id/1351644061/photo/red-heart-love-shape-hand-exercise-ball-with-doctor-physicians-stethoscope-on-white.jpg?s=612x612&w=0&k=20&c=jvPaBb00fdf6n350FKV3_yFRV7bSuf1Hfbao8xtuA6k=" alt="First slide" style={{ maxHeight: '450px', objectFit: 'cover' }} />
          <Carousel.Caption>
             <h3 style={{ color: 'LightCyan' }}>Modern Patient Care</h3>
<h3 style={{ color: 'DarkCyan' }}>Providing seamless healthcare management.</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://thumbs.dreamstime.com/b/bright-retirement-home-old-lady-lying-hospital-bed-talks-female-caregiver-bright-retirement-home-old-lady-lying-172995762.jpg" alt="Second slide" style={{ maxHeight: '450px', objectFit: 'cover' }} />
          <Carousel.Caption>
            <h3 style={{ color: 'LightCyan' }}>Connect with Doctors</h3>
<h3 style={{ color: 'Cyan' }}>Find and connect with top-rated medical professionals.</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://static.vecteezy.com/system/resources/thumbnails/068/906/014/small/the-doctor-writing-notes-on-a-clipboard-in-a-healthcare-setting-photo.jpeg" alt="Third slide" style={{ maxHeight: '450px', objectFit: 'cover' }} />
          <Carousel.Caption>
          <h3 style={{ color: 'LightCyan' }}>Secure and Accessible</h3>
<h3 style={{ color: 'Cyan' }}>Your health data is safe and available anytime, anywhere.</h3>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="mt-5 text-center">
        <h2>Welcome to the Patient Care Dashboard</h2>
        <p>
          This platform is designed to streamline healthcare processes, making it easier for patients to manage their health, doctors to provide care, and administrators to oversee operations.
        </p>
      </div>

      <hr className="my-5" />

      <h2 className="text-center mb-4">Our Services</h2>
      <Row className="justify-content-center g-4">
        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100 text-center">
            <Card.Body>
              <Card.Title>Book Appointments</Card.Title>
              <Card.Text>
                Easily schedule your appointments online with our available doctors.
              </Card.Text>
              <LinkContainer to="/book-appointment">
                <Button variant="primary">Book Now</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100 text-center">
            <Card.Body>
              <Card.Title>Patient Records</Card.Title>
              <Card.Text>
                Access your medical history, test results, and prescriptions securely.
              </Card.Text>
              <Button variant="primary" disabled>View Records</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100 text-center">
            <Card.Body>
              <Card.Title>Connect with Doctors</Card.Title>
              <Card.Text>
                Find and connect with top-rated medical professionals in various specialties.
              </Card.Text>
              <Button variant="primary" disabled>Find a Doctor</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
