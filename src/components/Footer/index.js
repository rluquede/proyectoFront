import { Col, Container, Row } from "react-bootstrap";
import { Facebook, Instagram, Twitter } from "react-bootstrap-icons";
import { Link } from "wouter";
import "./index.css";

export default function Footer() {
  return (
    <Container fluid className="footer ">
      <Row className="enlacesSection">
        <Col lg={3} className="mt-3 mb-3 ">
          <Row>
            <Col>
              <Link to="/" className="enlaceFooter">
                Inicio
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/terminos" className="enlaceFooter">
                Términos y condiciones
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/contacto" className="enlaceFooter">
                Contacto
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="icons justify-content-center">
        <Col xs={2} md={1}>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <Instagram size={40} className="iconFooter" />
          </a>
        </Col>
        <Col xs={2} md={1}>
          <a href="https://es-es.facebook.com" target="_blank" rel="noreferrer">
            <Facebook size={40} className="iconFooter" />
          </a>
        </Col>
        <Col xs={2} md={1}>
          <a
            href="https://twitter.com/?lang=es"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter size={40} className="iconFooter" />
          </a>
        </Col>
      </Row>
      <Row className="copy mt-3">
        <Col>
          <p>Proyecto de fin de ciclo superior</p>
        </Col>
      </Row>
      <Row className="copy">
        <Col>
          <p>2022 &copy; On Air. Todos los derechos reservados</p>
        </Col>
      </Row>
    </Container>
  );
}
