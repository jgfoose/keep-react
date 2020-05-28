import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Sidenav from './Sidenav';

const NavHeader = () => {

  return (
    <Navbar collapseOnSelect expand="xxl" variant="light">
      <Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
        React Keep
      </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Sidenav />
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavHeader
