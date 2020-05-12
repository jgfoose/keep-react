import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Nav = () => {
  return ( 
    <Navbar bg="secondary" variant="dark" >
      <Navbar.Brand href="#home">Keep React App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav