import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getEventos } from "../../services/eventos/eventos";
import Evento from "../Evento";
import "./index.css";

export default function ListaEventos() {
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    getEventos.then((res) => {
      const eventos = res.map((evento) => evento);
      setEventos(eventos);
    });
  },[]);

  return (
    <Container fluid>
      <Row className="mt-4">
        {eventos.map((evento) => (
          <Col md="12" lg="3"  key={evento.id}>
            <Evento evento={evento}></Evento>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
