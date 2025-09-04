import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, setIsAuthenticated, userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
      <Container>
        <LinkContainer to="/home">
          <Navbar.Brand>Patient Care Dashboard</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            {!isAuthenticated ? (
              <>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <NavDropdown title="Dashboard" id="basic-nav-dropdown">
                {userRole === 'admin' && (
                  <LinkContainer to="/admin">
                    <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                  </LinkContainer>
                )}
                {userRole === 'patient' && (
                  <LinkContainer to="/patient/dashboard">
                    <NavDropdown.Item>Patient Dashboard</NavDropdown.Item>
                  </LinkContainer>
                )}
                {userRole === 'doctor' && (
                  <LinkContainer to="/doctor/dashboard">
                    <NavDropdown.Item>Doctor Dashboard</NavDropdown.Item>
                  </LinkContainer>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;