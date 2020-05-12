import React from 'react';
import Nav from 'react-bootstrap/Nav';

const Sidenav = () => {
  return ( 
    <Nav  className="flex-column side_nav">
      <Nav.Link >Dev</Nav.Link>
      <Nav.Link eventKey="link-1">Job Hunt</Nav.Link>
      <Nav.Link eventKey="link-2">Personal</Nav.Link>
    </Nav>
  );
}

export default Sidenav;