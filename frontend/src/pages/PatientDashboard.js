import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Alert, Table, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://hospital-qmyr.onrender.com/api/appointments/patient', {
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
  }, []);

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
      <h1 className="text-center mb-4">Welcome to your Dashboard!</h1>
      <p className="text-center lead">Manage your appointments and health.</p>
      
      <Row className="mt-4 justify-content-center">
        <Col md={6} lg={4} className="mb-4">
          <Card className="h-100 shadow-sm text-center">
            <Card.Body>
              <Card.Title>Book an Appointment</Card.Title>
              <Card.Text>
                Find and book a consultation with a doctor.
              </Card.Text>
              <Link to="/book-appointment">
                <Button variant="primary">Book Now</Button>
              </Link>
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
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.doctor.name}</td>
                  <td>{formatDate(appointment.date)}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info">You have no upcoming appointments.</Alert>
        )}
      </div>
    </Container>
  );
};

export default PatientDashboard;
