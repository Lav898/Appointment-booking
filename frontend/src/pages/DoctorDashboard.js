import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Alert, Table, Spinner, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaUserMd, FaCalendarCheck, FaStethoscope } from 'react-icons/fa';

const myDoctorInfo = {
  name: 'Dr. John Smith',
  specialty: 'General Physician',
  experience: '15 years',
  about: 'Dr. John Smith is a dedicated General Physician with a passion for providing comprehensive healthcare. With over 15 years of experience, he has developed a reputation for his patient-centered approach and commitment to medical excellence.',
  contact: 'john.smith@example.com',
};

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [doctorInfo] = useState(myDoctorInfo);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5002/api/appointments/doctor', {
          headers: { 'x-auth-token': token }
        });
        setAppointments(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch appointments.');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []); // ✅ empty dependency so it runs only once

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(dateString));
  };

  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Welcome, {doctorInfo.name}!</h1>
      <p className="text-center lead">Manage your appointments and patient care.</p>
      
      <Row className="mt-4 justify-content-center g-4">
        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100 text-center p-3">
            <FaCalendarCheck size={48} className="text-primary mx-auto mb-3" />
            <Card.Body>
              <Card.Title>Upcoming Appointments</Card.Title>
              <Card.Text>
                You have {appointments.length} appointments scheduled.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100 text-center p-3">
            <FaUserMd size={48} className="text-primary mx-auto mb-3" />
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>
                View and update your professional details.
              </Card.Text>
              <Button variant="primary" onClick={handleShowProfile}>View Profile</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="shadow-sm h-100 text-center p-3">
            <FaStethoscope size={48} className="text-primary mx-auto mb-3" />
            <Card.Body>
              <Card.Title>Patient Care</Card.Title>
              <Card.Text>
                Access tools for patient management.
              </Card.Text>
              <Button variant="primary" disabled>View Tools</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-5">
        <h2 className="mb-3">My Appointments</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {appointments.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Medical History</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.patient?.name}</td>
                  <td>{formatDate(appointment.date)}</td>
                  <td>{appointment.medicalHistory}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info">You have no upcoming appointments.</Alert>
        )}
      </div>

      <Modal show={showProfile} onHide={handleCloseProfile} centered>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> {doctorInfo.name}</p>
          <p><strong>Specialty:</strong> {doctorInfo.specialty}</p>
          <p><strong>Experience:</strong> {doctorInfo.experience}</p>
          <p><strong>About:</strong> {doctorInfo.about}</p>
          <p><strong>Contact:</strong> {doctorInfo.contact}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProfile}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DoctorDashboard;
