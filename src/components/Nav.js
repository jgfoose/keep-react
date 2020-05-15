import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Nav = () => {
  return ( 
    <Navbar  bg="dark" variant="dark" flex-column>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#side_nav" aria-controls="side_nav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
      <Navbar.Brand href="#home">Keep React App</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav