import { Col, Container, Row } from "react-bootstrap";
import { Facebook, Instagram, Twitter } from "react-bootstrap-icons";
import { Link } from "wouter";
import "./index.css"

export default function Footer(){
    return(
        <Container fluid className="footer ">
            <Row className="enlacesSection">
               <Col lg={3} className="m-3" >
               <Row>
                   <Link to="/" className="enlaceFooter">Inicio</Link>
               </Row>
               <Row>
                   <Link to="/terminos" className="enlaceFooter">Términos y condiciones</Link>
               </Row>
               <Row>
                   <Link to="/contacto" className="enlaceFooter">Contacto</Link>
               </Row>
               </Col>
            </Row>
            <Row className="icons justify-content-center">
                <Col xs={1}>
                <Link to="/contacto" className="enlaceFooter"><Instagram size={40} /></Link>
                </Col>
                <Col xs={1}>
                <Facebook size={40}/>
                </Col>
                <Col xs={1}>
                <Twitter size={40}/>
                </Col>
            </Row>
            <Row className="copy mt-3">
            <p>2022 &copy; On Air. Todos los derechos reservados</p>
            </Row>
        </Container>
    )
}