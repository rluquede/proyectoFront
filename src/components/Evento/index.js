import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Button, Card, Container, Modal, Row } from "react-bootstrap";
import { useLocation } from "wouter";
import { deleteEvento } from "../../services/eventos/eventos";
import "./index.css";

export default function Evento(params) {
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth0();
  const [show, setShow] = useState(false);
  const [eventoBorrar, setEventoBorrar] = useState();
  
  const vista = () => {
    setLocation(`/evento/${params.evento.id}`);
  };

  //Mostrar modal
  const modalBorrar = () => {
    setEventoBorrar(params.evento.id);
    setShow(true);
  };

  //borrar evento
  const borrar = () => {
    deleteEvento(eventoBorrar).then(() => {
      setShow(false);
      window.location.reload();
    });
  };

  //nos movemos a la vista de actualizar
  const actualizar = () => {
    setLocation(`/actualizarEvento/${params.evento.id}`);
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
                {params.evento.fechaInicio}
                {params.evento.fechaFin ? " / " + params.evento.fechaFin : ""}
              </Row>
            </Container>
          </Card.Text>
          {isAuthenticated && user.nickname == "admin" ? (
            <>
              <Button className="me-3" onClick={actualizar} variant="danger">
                Editar
              </Button>
              <Button className="me-3" onClick={modalBorrar} variant="danger">
                Borrar
              </Button>
            </>
          ) : (
            ""
          )}
          {params.evento.stock > 0 ? (
            <Button onClick={vista} size="lg" variant="danger">
              Comprar
            </Button >
          ) : (
            <Button size="lg" disabled variant="danger">
              Agotado
            </Button>
          )}
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        backdrop="static"
        keyboard="false"
      >
        <Modal.Header>
          <Modal.Title>¿Estas seguro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estas seguro que deseas borrar este evento?</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShow(false);
            }}
            variant="link enlaceBorrar"
          >
            Cancelar
          </Button>
          <Button onClick={borrar} variant="danger">Borrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
