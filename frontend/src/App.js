import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import BookAppointmentPage from './pages/BookAppointmentPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userRole={userRole} />
        <main className="container-fluid py-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<AdminLoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
            
            {/* Protected Routes */}
            <Route 
              path="/admin" 
              element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/patient/dashboard" 
              element={isAuthenticated && userRole === 'patient' ? <PatientDashboard /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/doctor/dashboard" 
              element={isAuthenticated && userRole === 'doctor' ? <DoctorDashboard /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/book-appointment" 
              element={isAuthenticated && userRole === 'patient' ? <BookAppointmentPage /> : <Navigate to="/login" replace />} 
            />

            {/* Default redirect for unknown paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;