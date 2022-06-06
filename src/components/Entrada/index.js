import React from "react";
import { Button, Card, Container,  Row } from "react-bootstrap";
import {  useLocation } from "wouter";
import "./index.css";

export default function Entrada(params) {
  const [location, setLocation] = useLocation();
  const vista = () => {
    setLocation(`/entrada/${params.evento.id}`);
  };


  return (
    <>
      <Card className="bg-dark text-white carta mb-5">
        <Card.Img src={params.evento.imgUrl} className="cartaImagen" />

        <Card.Body>
          <Card.Title className="text-capitalize">
            {params.evento.titulo}
          </Card.Title>
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
          <Button onClick={vista} size="lg">
            Ver Entrada
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
