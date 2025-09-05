import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookAppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: '',
    patientName: '',
    patientAge: '',
    patientContact: '',
    medicalHistory: '',
    date: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('https://hospital-qmyr.onrender.com/api/users/doctors');
        setDoctors(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch doctors.');
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://hospital-qmyr.onrender.com/api/appointments',
        {
          doctorId: formData.doctorId,
          patientName: formData.patientName,
          patientAge: formData.patientAge,
          patientContact: formData.patientContact,
          medicalHistory: formData.medicalHistory,
          date: formData.date,
        },
        {
          headers: { 'x-auth-token': token },
        }
      );
      setSuccess('Appointment booked successfully!');
      setSubmitting(false);
      setTimeout(() => navigate('/patient/dashboard'), 2000);
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading doctors...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Book an Appointment</h1>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="doctorSelect" className="mb-3">
                <Form.Label>Choose a Doctor</Form.Label>
                <Form.Control as="select" name="doctorId" value={formData.doctorId} onChange={handleChange} required>
                  <option value="">-- Select a Doctor --</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              
              <Form.Group controlId="patientName" className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" name="patientName" value={formData.patientName} onChange={handleChange} required />
              </Form.Group>
              
              <Form.Group controlId="patientAge" className="mb-3">
                <Form.Label>Your Age</Form.Label>
                <Form.Control type="number" placeholder="Enter your age" name="patientAge" value={formData.patientAge} onChange={handleChange} required />
              </Form.Group>
              
              <Form.Group controlId="patientContact" className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your contact number" name="patientContact" value={formData.patientContact} onChange={handleChange} required />
              </Form.Group>
              
              <Form.Group controlId="medicalHistory" className="mb-3">
                <Form.Label>Reason for Visit</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Describe your medical history or reason for visit" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} required />
              </Form.Group>
              
              <Form.Group controlId="appointmentDate" className="mb-3">
                <Form.Label>Appointment Date & Time</Form.Label>
                <Form.Control type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3" disabled={submitting}>
                {submitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Confirm Booking'}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookAppointmentPage;
