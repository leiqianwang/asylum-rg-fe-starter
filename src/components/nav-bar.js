import React from 'react';
import AuthNav from './auth-nav';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

const MainNav = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={RouterNavLink} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* Add more navigation links here if needed */}
          </Nav>
          <AuthNav />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
