import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Titlebar = () => {
  return (
    <Navbar
      bg='dark' 
      variant='dark' 
      expand="md" 
    >
      <Container>
        <Navbar.Brand className='me-auto'>
          <Link className="navbar-brand" to={"/"}>
            <img src="assets/logo.png" alt="logo" style={{maxHeight: 75}}/>
          </Link>
        </Navbar.Brand>
        gfhgdfg
      </Container>
    </Navbar>
  )
}

export default Titlebar;