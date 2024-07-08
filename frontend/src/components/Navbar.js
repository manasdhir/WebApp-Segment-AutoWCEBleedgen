import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function BasicExample() {
  return (
    <Navbar
      expand="lg"
      className="border-body text-bg-success "
      style={{ height: "50px" }}
      data-bs-theme="dark"
    >
      <Navbar.Brand
        className="mr-auto "
        style={{
          fontSize: "30px",
          paddingLeft: "15px",
          paddingTop: "10px",
          fontFamily: "'Fanwood Text', serif",
          fontWeight: "bold",
        }}
        to="/Home"
      >
        CureTech
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        className="justify-content-end allign-item-center"
        style={{ paddingRight: "20px" }}
        id="basic-navbar-nav"
      >
        <Nav className="ml-auto  ">
          <Nav.Link as={Link} to="/Home" style={{ paddingRight: "30px" }}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/About" style={{ paddingRight: "30px" }}>
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/Services">
            Diagnosis
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default BasicExample;
