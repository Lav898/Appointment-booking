import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeartbeat, FaBrain, FaBone, FaBaby, FaAllergies, FaVirus, FaEye, FaDna, FaMale } from 'react-icons/fa';

const specialties = [
  { icon: <FaHeartbeat size={48} className="text-primary mb-3" />, title: 'Cardiology', description: 'From expert diagnosis to advanced treatments, navigating your heart’s journey starts here.' },
  { icon: <FaMale size={48} className="text-primary mb-3" />, title: 'General Physician', description: 'Our general physicians focus on prevention, diagnosis, and treatment of common illnesses.' },
  { icon: <FaBone size={48} className="text-primary mb-3" />, title: 'Orthopedics', description: 'From bones to joints, we champion your body’s foundation. Personalized care for a life in motion.' },
  { icon: <FaBrain size={48} className="text-primary mb-3" />, title: 'Neurology', description: 'From memory to movement, we navigate the complexities of the mind. Expert care for neurological wellbeing.' },
  { icon: <FaBaby size={48} className="text-primary mb-3" />, title: 'Pediatrics', description: 'Specialized care for infants, children, and adolescents, ensuring a healthy start in life.' },
  { icon: <FaAllergies size={48} className="text-primary mb-3" />, title: 'Immunology', description: 'Diagnosis and treatment of allergies, asthma, and immune system disorders.' },
  { icon: <FaVirus size={48} className="text-primary mb-3" />, title: 'Infectious Disease', description: 'Specialists in diagnosing and treating complex infections caused by bacteria, viruses, and fungi.' },
  { icon: <FaEye size={48} className="text-primary mb-3" />, title: 'Ophthalmology', description: 'Comprehensive eye care for all ages, from routine exams to advanced surgical treatments.' },
  { icon: <FaEye size={48} className="text-primary mb-3" />, title: 'ENT', description: 'Ear, Nose, and Throat specialists providing care for a wide range of conditions affecting the head and neck.' },
  { icon: <FaDna size={48} className="text-primary mb-3" />, title: 'Gastroenterology', description: 'Expert diagnosis and management of digestive system disorders.' },
  { icon: <FaDna size={48} className="text-primary mb-3" />, title: 'Genetics', description: 'Genetic counseling and testing to diagnose and manage inherited disorders.' },
  { icon: <FaHeartbeat size={48} className="text-primary mb-3" />, title: 'Nephrology', description: 'Specialized care for kidney-related diseases and conditions.' },
];

const AboutPage = () => {
  return (
    <Container className="my-5">
      <Card className="text-bg-dark">
        <Card.Img src="https://thumbs.dreamstime.com/b/doctor-stethoscope-hand-hospital-background-gown-94227568.jpg" alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title>About Our Platform</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
          </Card.Text>
          <Card.Text>
            <small>Last updated 3 mins ago</small>
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
      <p className="text-center lead my-5">
        We are dedicated to revolutionizing patient care through a comprehensive, secure, and user-friendly digital platform.
      </p>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-4 mb-4">
            <h3 className="mb-3">Our Mission</h3>
            <p>
              Our mission is to empower patients to take control of their health, enable doctors to provide more efficient and personalized care, and give administrators the tools they need to manage the healthcare ecosystem seamlessly. We believe that by connecting all stakeholders on a single platform, we can improve health outcomes for everyone.
            </p>
          </Card>
        </Col>
      </Row>

      <hr className="my-5" />

      <h2 className="text-center mb-4">Our Specialties</h2>
      <Row className="justify-content-center">
        {specialties.map((specialty, index) => (
          <Col key={index} md={4} lg={3} className="mb-4">
            <Card className="shadow-sm h-100 text-center p-3">
              <div className="mb-3">
                {specialty.icon}
              </div>
              <Card.Body>
                <Card.Title>{specialty.title}</Card.Title>
                <Card.Text>
                  {specialty.description}
                </Card.Text>
                <Button variant="outline-primary" disabled>Read More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutPage;