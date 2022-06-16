import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "wouter";
import { getEventos } from "../../services/eventos/eventos";
import Evento from "../Evento";
import "./index.css";

export default function ListaEventos() {
  const [eventos, setEventos] = useState([]);
  const [location, setLocation] = useLocation();

 
  useEffect(() => {
    getEventos.then((res) => {
      const eventos = res.map((evento) => evento);
      setEventos(eventos);
    }).catch((err)=>{
      setLocation("/errorNotFound")
    })

  },[]);

  

  return (
    <Container fluid>
      <Row className="mt-4">
        {eventos.map((evento) => (
          <Col xs="12" md="6"  xl="3" key={evento.id}>
            <Evento evento={evento}></Evento>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
