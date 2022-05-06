import React from "react";
import { CloseButton, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "wouter";
import "./index.css"
import logo from '../../img/logo.png';


export default function Header(){
    return(
        <Navbar bg="dark" expand="lg" fixed="top" sticky="top" className="navBar" >
            <Container fluid>
                <Navbar.Brand href="/">
                <img src={logo} alt="logo"/>
                </Navbar.Brand> 
                <Navbar.Toggle className="boton" aria-controls={`offcanvasNavbar-expand-lg`}/>
                <Navbar.Offcanvas id={`offcanvasNavbar-expand-lg`} aria-labelledby={`offcanvasNavbarLabel-expand-lg`} placement="end" className="canvas">
                    <Offcanvas.Header closeButton closeVariant="white">
                        <Offcanvas.Title id={`offcanvasNavbar-expand-lg`}>
                            Usuario
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3 enlaces">
                        <Nav.Link to="/" className="enlace">Mis entradas</Nav.Link>
                        <Nav.Link to="/" className="enlace">Cerrar Sesion</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}