import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
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
import { useLocation } from "wouter";
import {
  deleteEntrada,
  enviarCorreo,
  getEntrada,
} from "../../services/entradas/entradas";
import getEvento, { compra } from "../../services/eventos/eventos";
import "./index.css";

export default function EntradaVista(props) {
  const [evento, setEvento] = useState({});
  const [entrada, setEntrada] = useState({});
  const { user, isAuthenticated } = useAuth0();
  const [location, setLocation] = useLocation();
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    setLocation("/errorUnauthorized");
  }

  //Descargamos entrada
  useEffect(() => {
    if (isAuthenticated) {
      let userId = user.sub.split("|");
      getEntrada(userId[1], props.params.id)
        .then((res) => {
          setEntrada(res);
        })
        .catch((err) => {
          setLocation("/errorNotFound");
        });
    }
  }, [isAuthenticated]);

  //Descargamos evento de la entrada
  useEffect(() => {
    getEvento({ id: props.params.id })
      .then((data) => {
        setEvento(data);
      })
      .catch((err) => {
        setLocation("/errorNotFound");
      });
  }, []);

  //Funcion para enviar correo
  const enviarEntradas = () => {
    setLoading(true);
    let entradaEmail = {
      id: user.sub.split("|")[1] + evento.id + entrada.numeroEntradas,
      titulo: evento.titulo,
      lugar: evento.lugar,
      fechaInicio: evento.fechaInicio,
      fechaFin: evento.fechaFin ? evento.fechaFin : null,
      numero: entrada.numeroEntradas,
      email: entrada.email,
    };

    enviarCorreo(entradaEmail)
      .then((res) => {
        setAlertMsg({
          msg: "Entrada enviada correctamente, mira en tu correo",
          type: "success",
        });
        setLoading(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      })
      .catch((err) => {
        setAlertMsg({
          msg: "Fallo al enviar tu correo, intentelo de nuevo",
          type: "success",
        });
        setLoading(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      });
  };

  //Funcion para volver atras
  const atras = () => {
    setLocation("/misEntradas");
  };

  //Funcion para devolver entrada
  const devolverEntrada = () => {
    setLoading(true);
    let nuevoStock = evento.stock + entrada.numeroEntradas;
    let userId = user.sub.split("|");
    compra(props.params.id, nuevoStock).then((res) => {
      deleteEntrada(userId[1], evento.id).then((res) => {
        setLoading(false);
        setLocation("/misEntradas");
      });
    });
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
        <Row className=" justify-content-center datosCompra">
          <Col md="12" lg="4" className="mt-5">
            <Row>
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
            <Form>
              <Row>
                <FormGroup>
                  <FloatingLabel label="Email" className="mb-3">
                    <FormControl
                      type="email"
                      placeholder="Email"
                      name="email"
                      size="lg"
                      id="emailInput"
                      defaultValue={entrada.email}
                      disabled
                    ></FormControl>
                  </FloatingLabel>
                </FormGroup>
              </Row>
              <Row>
                <Col md="5">
                  <h4>Nº de entradas: {entrada.numeroEntradas}</h4>
                </Col>
                <Col md="7">
                  <Button
                    variant="link devolver"
                    onClick={(e) => setShow(true)}
                  >
                    Devolver entradas
                  </Button>
                  <Button
                    className="ms-2"
                    onClick={enviarEntradas}
                    variant="danger"
                  >
                    {" "}
                    {loading ? (
                      <Spinner animation="border" variant="light" size="sm" />
                    ) : (
                      ""
                    )}{" "}
                    &nbsp; Descargar Entradas
                  </Button>
                </Col>
              </Row>
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
        backdrop="static"
        keyboard="false"
      >
        <Modal.Header>
          <Modal.Title>¿Estas seguro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estas seguro que deseas devolver esta entrada?</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShow(false);
            }}
            variant="link enlaceBorrar"
          >
            Cancelar
          </Button>
          <Button onClick={devolverEntrada} variant="danger">
            {" "}
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              ""
            )}{" "}
            &nbsp; Devolver
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
