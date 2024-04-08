import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h3>Contáctanos</h3>
            <p> Correo: info@learningto.com</p>
            <p>Teléfono: +34 777 88 99</p>
          </Col>
          <Col md={4}>
            <h3>Síguenos</h3>
            <p></p>
            <div className="social-icons">
              <a
                href="http://www.facebook.com/"
                style={{ marginRight: "30px", fontSize: "30px" }}
              >
                <GrFacebookOption />
              </a>
              <a
                href="https://www.instagram.com/"
                style={{ marginRight: "30px", fontSize: "30px" }}
              >
                <FaInstagram />
              </a>
              <a href="https://twitter.com/" style={{ fontSize: "30px" }}>
                <FaTwitter />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h3>Enlaces</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="about">Nosotros</a>
              </li>
              <li>
                <a href="contact">Contáctanos</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container>
          <p>&copy; 2024 Aprendiendo Juntos. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
};
