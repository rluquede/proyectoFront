import { useAuth0 } from "@auth0/auth0-react";
import { async } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation } from "wouter";
import storage from "../../firebase/firebaseConfig";
import getEvento, {
  postEventos,
  updateEvento,
} from "../../services/eventos/eventos";

export default function EventoForm(props) {
  const [location, setLocation] = useLocation();
  let nuevoEvento = new Object();
  let nuevoEventoActualizar = {};
  const [eventoActualizar, setEventoActualizar] = useState({});
  const [actualizar, setActualizar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({});
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth0();
 
  if(!isAuthenticated ){
    setLocation("/errorUnauthorized");
  }else if(isAuthenticated && !user.nickname == "admin"){
    setLocation("/errorUnauthorized");
  }

  useEffect(() => {
    if (props.params.id) {
      getEvento({ id: props.params.id }).then((data) => {
        setEventoActualizar(data);
        setActualizar(true);
      });
    }
  }, []);

  //Funcion para crear evento
  const crearEvento = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (event.target[6].files[0]) {
      let file = event.target[6].files[0];
      let storageRef = ref(storage, "eventos/" + file.name);
      await uploadBytes(storageRef, file).then(async (snapshot) => {
        await getDownloadURL(ref(storage, "eventos/" + file.name)).then(
          (url) => {
            nuevoEvento.imgUrl = url;
          }
        );
      });
    } else {
      nuevoEvento.imgUrl =
        "https://firebasestorage.googleapis.com/v0/b/onair-a77ac.appspot.com/o/eventos%2Fdefault.webp?alt=media&token=cb7ecb8f-13a5-4d85-bdcf-69326b56ebf0";
    }

    nuevoEvento.titulo = event.target[0].value;
    nuevoEvento.lugar = event.target[1].value;
    nuevoEvento.fechaInicio = event.target[2].value;
    nuevoEvento.fechaFin = event.target[3].value;
    nuevoEvento.stock = parseInt(event.target[4].value);
    nuevoEvento.precio = parseFloat(event.target[5].value);
    console.log(nuevoEvento, "evento");

    postEventos(nuevoEvento).then((res) => {
      console.log(res);
      if (res.code == "ERR_BAD_REQUEST") {
        setAlertMsg({ msg: "Error al actualizar el evento", type: "danger" });
        setLoading(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      } else {
        setAlertMsg({
          msg: "Evento actualizado correctamente",
          type: "success",
        });
        setLoading(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    });
  };

  const actualizarEvento = async (event) => {
    event.preventDefault();

    if (event.target[6].files[0]) {
      let file = event.target[6].files[0];
      let storageRef = ref(storage, "eventos/" + file.name);
      await uploadBytes(storageRef, file).then(async (snapshot) => {
        await getDownloadURL(ref(storage, "eventos/" + file.name)).then(
          (url) => {
            console.log(url);
            nuevoEventoActualizar.imgUrl = url;
          }
        );
      });
    } else {
      nuevoEventoActualizar.imgUrl = eventoActualizar.imgUrl;
    }

    nuevoEventoActualizar.titulo = event.target[0].value;
    nuevoEventoActualizar.lugar = event.target[1].value;
    nuevoEventoActualizar.fechaInicio = event.target[2].value;
    nuevoEventoActualizar.fechaFin = event.target[3].value;
    nuevoEventoActualizar.stock = parseInt(event.target[4].value);
    nuevoEventoActualizar.precio = parseFloat(event.target[5].value);
    console.log(nuevoEventoActualizar);
    updateEvento(props.params.id, nuevoEventoActualizar).then((res) => {
      console.log(res);
      if (res.code == "ERR_BAD_REQUEST") {
        setAlertMsg({ msg: "Error al actualizar el evento", type: "danger" });
        setLoading(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      } else {
        setAlertMsg({
          msg: "Evento actualizado correctamente",
          type: "success",
        });
        setLoading(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-start mt-3">
          <Col xs="1">
            <a href="/">
              <ArrowLeft size={30} color="black"></ArrowLeft>
            </a>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            {actualizar ? (
              <h3>Actualiza el evento</h3>
            ) : (
              <h3>Crea un nuevo evento</h3>
            )}
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Form onSubmit={actualizar ? actualizarEvento : crearEvento}>
              <Row>
                <FormGroup as={Col} md="7">
                  <FloatingLabel
                    label="Nombre del evento"
                    className="mb-3"
                    controlId="evento.nombre"
                  >
                    <FormControl
                      type="text"
                      placeholder="Nombre del evento"
                      name="titulo"
                      defaultValue={actualizar ? eventoActualizar.titulo : ""}
                      required
                    />
                  </FloatingLabel>
                  <FormControl.Feedback type="invalid">
                    Debes de introducir el nombre del evento
                  </FormControl.Feedback>
                </FormGroup>

                <FormGroup as={Col} md="5">
                  <FloatingLabel
                    label="Lugar del evento"
                    className="mb-3"
                    controlId="evento.lugar"
                  >
                    <FormControl
                      type="text"
                      placeholder="Lugar del evento"
                      name="lugar"
                      defaultValue={actualizar ? eventoActualizar.lugar : ""}
                      required
                    />
                  </FloatingLabel>
                  <FormControl.Feedback type="invalid">
                    Debes de introducir el lugar del evento
                  </FormControl.Feedback>
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} md="3">
                  <FloatingLabel
                    label="Fecha del Inicio evento"
                    className="mb-3"
                    controlId="evento.fechaInicio"
                  >
                    <FormControl
                      type="date"
                      placeholder="Fecha de inicio del evento"
                      name="fechaInicio"
                      defaultValue={
                        actualizar ? eventoActualizar.fechaInicio : ""
                      }
                      required
                    />
                  </FloatingLabel>
                  <FormControl.Feedback type="invalid">
                    Debes de introducir la fecha del evento
                  </FormControl.Feedback>
                </FormGroup>
                <FormGroup as={Col} md="3">
                  <FloatingLabel
                    label="Fecha del fin evento"
                    className="mb-3"
                    controlId="evento.fechaFin"
                  >
                    <FormControl
                      type="date"
                      placeholder="Fecha de fin del evento"
                      name="fechaFin"
                      defaultValue={actualizar ? eventoActualizar.fechaFin : ""}
                    />
                  </FloatingLabel>
                </FormGroup>
                <FormGroup as={Col} md="3">
                  <FloatingLabel
                    label="Nº de entradas"
                    className="mb-3"
                    controlId="evento.stock"
                  >
                    <FormControl
                      type="text"
                      placeholder="Nº de entradas"
                      name="stock"
                      defaultValue={actualizar ? eventoActualizar.stock : ""}
                      required
                    />
                  </FloatingLabel>
                  <FormControl.Feedback type="invalid">
                    Debes de introducir el numero de entradas del evento
                  </FormControl.Feedback>
                </FormGroup>
                <FormGroup as={Col} md="3">
                  <FloatingLabel
                    label="precio de las entradas"
                    className="mb-3"
                    controlId="evento.precio"
                  >
                    <FormControl
                      type="text"
                      placeholder="precio de entradas"
                      name="precio"
                      defaultValue={actualizar ? eventoActualizar.precio : ""}
                      required
                    />
                  </FloatingLabel>
                  <FormControl.Feedback type="invalid">
                    Debes de introducir el precio del evento
                  </FormControl.Feedback>
                </FormGroup>
              </Row>
              <Row>
                <FormLabel className="mb-3 justify-content-start">
                  Imagen del Concierto
                </FormLabel>
                <FormGroup as={Col} controlId="evento.imgUrl" md="12">
                  <FormControl
                    type="file"
                    placeholder="Imagen del concierto"
                    name="imgUrl"
                  />
                </FormGroup>
              </Row>
              <Row className="mt-5">
                <Col>
                  {actualizar ? (
                    <Button variant="danger" type="submit" size="lg">
                      {loading ? (
                        <Spinner animation="border" variant="light" size="sm" />
                      ) : (
                        ""
                      )}
                       Actualizar
                    </Button>
                  ) : (
                    <Button variant="danger" type="submit" size="lg">
                      {loading ? (
                        <Spinner animation="border" variant="light" size="sm" />
                      ) : (
                        ""
                      )}
                       Enviar
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row className="mt-2">
          <Alert show={showAlert} variant={alertMsg.type}>
            {alertMsg.msg}
          </Alert>
        </Row>
      </Container>
    </>
  );
}
