import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation } from "wouter";
import getEntradasByUser from "../../services/entradas/entradas";
import getEvento from "../../services/eventos/eventos";
import Entrada from "../Entrada";
import "./index.css";

export default function ListaEntradas() {
  const { user, isAuthenticated } = useAuth0();
  const [entradas, setEntradas] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [location, setLocation] = useLocation();
  const [sinEntradas, setSinEntradas] = useState(false)

  const atras = () => {
    setLocation("/");
  };

  if(!isAuthenticated){
    setLocation("/errorUnauthorized");
  }

  //Obtenemos entradas del usuario
  useEffect(() => {
    if (isAuthenticated) {
      let userId = user.sub.split("|");
      getEntradasByUser({ userId: userId[1] }).then((res) => {
        if(res.message){
          setSinEntradas(true)
        }
        setEntradas(res);
      })
    }
  }, [isAuthenticated]);

  //Obtenemos los eventos de las entradas
  useEffect(() => {
    if (entradas.length > 0) {
      entradas.map((entrada) => {
        getEvento({ id: entrada.eventoId }).then((res) => {
          setEventos((prev) => {
            return [...prev, res];
          });
        }).catch((err)=>{
          setLocation("/errorNotFound")
        })
      });
    }
  }, [entradas]);

  return (
    <>
      <Container fluid>
        <Row className="justify-content-start mt-3">
          <Col xs="1">
            <ArrowLeft size={30} onClick={atras}></ArrowLeft>
          </Col>
        </Row>
        

        <Row className="mt-5">
          {sinEntradas?(
            <h2 >No tienes entradas aún</h2>
          ):(<h2>Mis Entradas</h2>)}
        </Row>
        <Row className="mt-4">
          {eventos.map((evento) => (
            <Col xs="12" md="6"  xl="3" key={evento.id}>
              <Entrada evento={evento}></Entrada>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
