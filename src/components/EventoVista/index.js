import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  Image,
  Row,
} from "react-bootstrap";
import { Link } from "wouter";
import { useLocation } from "wouter";
import { Redirect } from "wouter";
import getEvento from "../../services/eventos/eventos";
import "./index.css";

export default function EventoVista(props) {
  const [evento, setEvento] = useState({});
  const { user, isAuthenticated } = useAuth0();
  let stockEntradas = [];
  const [nEntradas, setNEntradas] = useState(1);
  const [precio, setPrecio] = useState(0);
  const [location, setLocation] = useLocation();
  useEffect(() => {
    getEvento({ id: props.params.id }).then((data) => {
      setEvento(data);
      setNEntradas(1);
      setPrecio(data.precio);
    }).
    catch((err)=>{setLocation("/")})
  }, []);

  useEffect(() => {
    setPrecio(nEntradas * evento.precio);
  }, [nEntradas]);

  for (let i = 1; i <= evento.stock; i++) {
    stockEntradas.push(i);
  }

  const datosCompra = (e) => {
    e.preventDefault();
    let datosCompra = {
      "nombre": e.target[0].value +" "+ e.target[1].value,
      "email": e.target[2].value,
      "nEntradas": nEntradas,
      "precio": precio
    }
    console.log(datosCompra);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="12" className="filaCabecera">
            <Image src={evento.imgUrl} className="fotoEvento"></Image>
          </Col>
        </Row>
        <Row className=" justify-content-lg-center datosCompra">
          <Col md="12" lg="4" className="mt-5">
            <Row>
              <h1>{evento.titulo}</h1>
            </Row>
            <Row>
              <Col lg="12" className="mt-3">
                <h3>{evento.lugar}</h3>
              </Col>
              <Col  lg="12" className="mt-3">
                <h5>{(evento.fecha)}</h5>
              </Col>
            </Row>
          </Col>
          <Col md="12" lg="6" className="mt-5">
            <Form onSubmit={datosCompra}>
              <Row>
                <FormGroup as={Col} md="5" xs="12">
                  <FloatingLabel
                    label="Nombre"
                    className="mb-3"
                    controlId="entrada.nombre"
                  >
                    <FormControl
                      type="text"
                      placeholder="Nombre"
                      name="email"
                      required
                    ></FormControl>
                  </FloatingLabel>
                </FormGroup>
                <FormGroup as={Col} md="7" xs="12">
                  <FloatingLabel
                    label="Apellidos"
                    className="mb-3"
                    controlId="entrada.apellidos"
                  >
                    <FormControl
                      type="text"
                      placeholder="Apellidos"
                      name="email"
                      required
                    ></FormControl>
                  </FloatingLabel>
                </FormGroup>
              </Row>
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
                      defaultValue={isAuthenticated ? user.name : ""}
                      required
                    ></FormControl>
                  </FloatingLabel>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} md="5">
                  <FloatingLabel
                    label="Nº de Entradas"
                    className="mb-3"
                    controlId="entrada.stock"
                  >
                    <Form.Select
                      defaultValue={1}
                      onChange={(e) => {
                        setNEntradas(e.target.value);
                      }}
                    >
                      {stockEntradas.map((index) => {
                        return (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </FloatingLabel>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} lg="6" md="6" xs="6" >
                  <Form.Check
                    type="switch"
                    id="condiciones"
                    className="justify-content-start"
                  >
                    <Form.Check.Input type="checkbox" id="condiciones" required />
                    <Form.Check.Label>Acepto los <Link to="/terminos">Terminos y Condiciones</Link> de la Compra</Form.Check.Label>
                  </Form.Check>

                </FormGroup>
                
                <Col md="6" lg="6" xs="6">
                  <h3>{precio.toString()}€</h3>
                </Col>
              </Row>

              <FormGroup  className="button">
                <Button type="submit" size="lg" > Comprar </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
