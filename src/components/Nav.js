import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Nav = () => {
  return ( 
    <Navbar  bg="dark" variant="dark" flex-column>
      <button className="navbar-toggler" data-toggle="collapse" href="#side_nav" aria-controls="side_nav" aria-expanded="true" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Navbar.Brand href="#home">Keep React App</Navbar.Brand>
    </Navbar>
  );
}

export default Nav