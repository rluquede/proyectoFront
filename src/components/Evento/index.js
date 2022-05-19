import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "wouter";
import "./index.css";

export default function Evento(params) {
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth0();
  const vista = () => {
    setLocation(`/evento/${params.evento.id}`);
  };
  
  return (
    <Card className="bg-dark text-white carta mb-5">
      <Card.Img src={params.evento.imgUrl} className="cartaImagen" />
      
        <Card.Body>
          <Card.Title className="text-capitalize">{params.evento.titulo}</Card.Title>
          <Card.Text>
            <Container>
              <Row className="justify-content-center">
                {params.evento.lugar}
              </Row>
              <Row className="justify-content-center">
                {params.evento.fecha}
              </Row>
            </Container>
          </Card.Text>
          {isAuthenticated && user.nickname == "admin" ? (
              <>
              <Button className="me-3">Editar</Button>
              <Button className="me-3">Borrar</Button>
              </>
          ):""}
          <Button onClick={vista} size="lg">Comprar</Button>
          
        </Card.Body>
      
    </Card>
  );
}
