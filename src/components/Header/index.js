import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import "./index.css";
import logo from "../../img/webp/logoNuevo.webp";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import { Link } from "wouter";

export default function Header() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Navbar bg="dark" expand="lg" fixed="top" sticky="top" className="navBar">
      <Container fluid>
        <Navbar.Brand>
          <a href="/">
            <img src={logo} alt="logo" className="logo" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle
          className="boton"
          aria-controls={`offcanvasNavbar-expand-lg`}
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
          className="canvas"
        >
          <Offcanvas.Header closeButton closeVariant="white"></Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 enlaces">
              {isAuthenticated ? (
                <>
                  <Link href="/" className="enlace">
                    Mis entradas
                  </Link>
                  {user.nickname === "admin" ? (
                    <Link href="/nuevoEvento" className="enlace">
                      Añadir evento
                    </Link>
                    
                  ) : (
                    ""
                  )}
                  <NavDropdown title={user.nickname} id="userDropdown">
                    <NavDropdown.Item id="dropdown">
                      <LogoutButton></LogoutButton>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LoginButton></LoginButton>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
