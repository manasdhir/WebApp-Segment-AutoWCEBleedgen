import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";

import "./Home";
// Home.js

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
// import ./homepageimage; // Make sure to correct the import if needed.

function ShapeExample() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={6}>
          <div
            style={{
              width: "40rem",
              height: "25rem",
              borderRadius: "10px",
              backgroundColor: "rgb(194, 239, 212)",
              color: "#145a32",
              textAlign: "center",
              padding: "20px",
              marginRight: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "50px",
                fontWeight: "normal",
                marginBottom: "20px",
                fontFamily: "'Fanwood Text', serif",
              }}
            >
              Keep your stomach & intestine in check using AI!
            </h1>
            <p
              style={{
                fontWeight: "lighter",
                marginBottom: "20px",
                lineHeight: "1.5",
              }}
            >
              Upload Video Capsule Endoscopy frames and get your diagnosis in
              seconds along with a detailed report
            </p>

            <Link to="/services">
              <Button variant="success" style={{ width: "150px" }}>
                Start Now
              </Button>
            </Link>
          </div>
        </Col>
        <Col md={6} style={{ paddingLeft: "100px" }}>
          <div
            style={{
              width: "25rem",
              height: "25rem",
              backgroundColor: "lightgray",
              borderRadius: "50%", // Changed to create an oval shape
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "10px solid rgb(194, 239, 212)",
            }}
          >
            <Image
              src="https://img.freepik.com/free-vector/abdominal-pain-concept-illustration_114360-17516.jpg?w=740&t=st=1712947783~exp=1712948383~hmac=b8148fae57d3bea79078bf0ff7891b128d1808e8535d90a21b79d41f8da48fd1"
              fluid
              style={{ borderRadius: "50%", width: "100%", height: "auto" }} // Ensure the image is also oval
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ShapeExample;
