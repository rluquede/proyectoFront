import { useAuth0 } from "@auth0/auth0-react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  Image,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "wouter";
import { useLocation } from "wouter";
import {
  enviarCorreo,
  getEntrada,
  postEntradas,
  updateEntrada,
} from "../../services/entradas/entradas";
import getEvento, { compra } from "../../services/eventos/eventos";
import "./index.css";

const stripePromise = loadStripe(
  "pk_test_51L2c6FCd5ojOmmEHIgl2R9rYPsOGnT65jFfoigyRLrtsMxkOKwcMiPCCgfGrR2PyEbr0YCewLRFual4wa0jXwXmS00A3je7AHm"
);

export default function EventoVista(props) {
  const [evento, setEvento] = useState({});
  const { user, isAuthenticated } = useAuth0();
  let stockEntradas = [];
  const [nEntradas, setNEntradas] = useState(1);
  const [precio, setPrecio] = useState(0);
  const [location, setLocation] = useLocation();
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({});
  const [loading, setLoading] = useState(false)

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    //Funcion para comprar entrada
    const comprar = async (e) => {
      e.preventDefault();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      setShow(false)
      setLoading(true);
      if (!error) {
        
        const { id } = paymentMethod;
        try {
          const { data } = await axios.post(
            "https://apionair.herokuapp.com/api/checkout",
            {
              id: id,
              amount: Math.trunc(precio) * 100,
            }
          );
          if (data.status == 200) {
            if (isAuthenticated) {
              let userId = user.sub.split("|");

              const entrada = await getEntrada(userId[1], props.params.id);
              if (entrada) {
                console.log(entrada);
                let nuevoNumero =
                  parseInt(entrada.numeroEntradas) + parseInt(nEntradas);
                updateEntrada(userId[1], props.params.id, nuevoNumero);
              } else {
                postEntradas(
                  userId[1],
                  props.params.id,
                  parseInt(nEntradas),
                  document.getElementById("emailInput").value
                );
              }
            }
            let entradaEmail = {
              id: isAuthenticated
                ? user.sub.split("|")[1]
                : Math.floor(Math.random() * (999999999 - 100000) + 100000) +
                  props.params.id +
                  nEntradas,
              titulo: evento.titulo,
              lugar: evento.lugar,
              fechaInicio: evento.fechaInicio,
              fechaFin: evento.fechaFin ? evento.fechaFin : null,
              numero: nEntradas,
              email: document.getElementById("emailInput").value,
            };
            enviarCorreo(entradaEmail)
              .then((res) => {
                let nuevoStock = evento.stock - nEntradas;
                compra(props.params.id, nuevoStock)
                  .then((res) => {
                    setAlertMsg({
                      msg: "Entrada comprada correctamente, mira en tu correo",
                      type: "success",
                    });
                    setLoading(false)
                    setShowAlert(true);
                    setTimeout(() => {
                      setShowAlert(false);
                      setLocation("/");
                    }, 5000);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log("fallo email");
                setShow(false);
              });
          }
        } catch (error) {
          setAlertMsg({
            msg: "Ha ocurrido un error, intentelo de nuevo",
            type: "danger",
          });
          setLoading(false)
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
          
        }
      }
    };

    return (
      <form onSubmit={comprar}>
        <CardElement options={{ hidePostalCode: true }} />
        <Button onClick={comprar} className="mt-4" variant="danger">
          Comprar
        </Button>
      </form>
    );
  };

  //Obtenemos el evento
  useEffect(() => {
    getEvento({ id: props.params.id })
      .then((data) => {
        setEvento(data);
        setNEntradas(1);
        setPrecio(data.precio);
      })
      .catch((err) => {
        setLocation("/errorNotFound");
      });
  }, []);

  //Actualizar precio
  useEffect(() => {
    setPrecio(nEntradas * evento.precio);
  }, [nEntradas]);

  for (let i = 1; i <= evento.stock; i++) {
    stockEntradas.push(i);
  }

  const atras = () => {
    setLocation("/");
  };

  //Mostramos el modal
  const datosCompra = (e) => {
    e.preventDefault();    
    setShow(true);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="12" className="filaCabecera">
            <Image src={evento.imgUrl} className="fotoEvento"></Image>
          </Col>
        </Row>
        <Row className="justify-content-start mt-3">
          <Col xs="1">
            <ArrowLeft size={30} onClick={atras}></ArrowLeft>
          </Col>
        </Row>
        <Row className="justify-content-center datosCompra">
          <Col md="12" lg="4" className="mt-5">
            <Row className="justify-content-center">
              <h1>{evento.titulo}</h1>
            </Row>
            <Row>
              <Col lg="12" className="mt-3">
                <h3>{evento.lugar}</h3>
              </Col>
              <Col lg="12" className="mt-3">
                <h5>
                  {evento.fechaInicio}
                  {evento.fechaFin ? " / " + evento.fechaFin : ""}{" "}
                </h5>
              </Col>
            </Row>
          </Col>
          <Col md="12" lg="6" className="mt-5">
            <Form onSubmit={datosCompra}>
              <Row>
                <FormGroup>
                  <FloatingLabel label="Email" className="mb-3">
                    <FormControl
                      type="email"
                      placeholder="Email"
                      name="email"
                      size="lg"
                      id="emailInput"
                      defaultValue={isAuthenticated ? user.email : ""}
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
                          <option key={index} value={index} className="select">
                            {index}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </FloatingLabel>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} lg="6" md="6" xs="6">
                  <Form.Check
                    type="switch"
                    id="condiciones"
                    className="justify-content-start"
                  >
                    <Form.Check.Input
                      type="checkbox"
                      id="condiciones"
                      required
                    />
                    <Form.Check.Label>
                      Acepto los
                      <Link to="/terminos" className="terminosEnlace">
                        {" "}
                        Terminos y Condiciones{" "}
                      </Link>{" "}
                      de la Compra
                    </Form.Check.Label>
                  </Form.Check>
                </FormGroup>

                <Col md="6" lg="6" xs="6">
                  <h3>{precio.toString()}€</h3>
                </Col>
              </Row>
              <FormGroup className="button">
                <Button type="submit" size="lg" variant="danger">
                {loading?(<Spinner animation="border" variant="light" size="sm" />):" "}
                &nbsp; Comprar
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        
        
          <Alert show={showAlert} variant={alertMsg.type} className="mt-3">
            {alertMsg.msg}
          </Alert>
      </Container>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Introduce los datos de tu tarjeta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Modal.Body>
      </Modal>
    </>
  );
}
