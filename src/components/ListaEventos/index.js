import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getEventos } from "../../services/eventos/eventos";
import "./index.css";

export default function ListaEventos() {
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    getEventos.then((res) => {
      const eventos = res.map((evento) => evento);
      setEventos(eventos);
    });
  });

  return (
    <Container>
      <Row>
        {eventos.map((evento) => (
          <Col key={evento.id}>
            <a href={evento.id}>
              <p>{evento.titulo}</p>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
