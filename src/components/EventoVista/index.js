import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  Image,
  Row,
} from "react-bootstrap";
import getEvento from "../../services/eventos/eventos";
import "./index.css";

export default function EventoVista(props) {
  const [evento, setEvento] = useState({});
  useEffect(() => {
    getEvento({ id: props.params.id }).then((data) => setEvento(data));
  }, []);
  const { user, isAuthenticated } = useAuth0();
  console.log(evento);
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="12" className="filaCabecera">
            <Image src={evento.imgUrl} className="fotoEvento"></Image>
          </Col>
        </Row>
        <Row className=" justify-content-lg-center">
          <Col md="12" lg="4" className="mt-5">
            <Row>
              <h1>{evento.titulo}</h1>
            </Row>
            <Row>
              <Col xs="6" lg="12" className="mt-3">
                <h3>{evento.lugar}</h3>
              </Col>
              <Col xs="6" lg="12" className="mt-3">
                <h6>{evento.fecha}</h6>
              </Col>
            </Row>
          </Col>
          <Col md="12" lg="6" className="mt-5">
            <Form>
              <Row>
                <FormGroup>
                  <FloatingLabel
                    label="Email"
                    className="mb-3"
                    controlId="entrada.email"
                  >
                    <FormControl
                      type="text"
                      placeholder="Email"
                      name="email"
                      size="lg"
                      defaultValue={isAuthenticated?user.name:""}
                      required
                    ></FormControl>
                  </FloatingLabel>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup>
                  <FloatingLabel
                    label="Nº de entradas"
                    className="mb-3"
                    controlId="entrada.stock"
                  >
                    <FormControl
                      type="text"
                      placeholder="Email"
                      name="email"
                      defaultValue={isAuthenticated?user.name:""}
                      required
                    ></FormControl>
                  </FloatingLabel>
                </FormGroup>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
