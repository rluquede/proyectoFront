import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import storage from "../../firebase/firebaseConfig";
import { postEventos } from "../../services/eventos/eventos";

export default function EventoForm() {
  let evento = new Object();
  const crearEvento = (event) => {
    event.preventDefault();

    if (event.target[5].files[0]) {
      let file = event.target[5].files[0];
      let storageRef = ref(storage, "eventos/" + file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(ref(storage, "eventos/" + file.name)).then((url) => {
          evento.imgUrl = url;
        });
      });
    }else{
        evento.imgUrl = "https://firebasestorage.googleapis.com/v0/b/onair-a77ac.appspot.com/o/eventos%2Fdefault.webp?alt=media&token=cb7ecb8f-13a5-4d85-bdcf-69326b56ebf0"
    }

    evento.titulo = event.target[0].value;
    evento.lugar = event.target[1].value;
    evento.fecha = event.target[2].value;
    evento.stock = parseInt(event.target[3].value);
    evento.precio = parseFloat(event.target[4].value);

    postEventos(evento);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h3>Crea un nuevo evento</h3>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Form onSubmit={crearEvento}>
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
                    required
                  />
                </FloatingLabel>
                <FormControl.Feedback type="invalid">
                  Debes de introducir el lugar del evento
                </FormControl.Feedback>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup as={Col} md="6">
                <FloatingLabel
                  label="Fecha del evento"
                  className="mb-3"
                  controlId="evento.fecha"
                >
                  <FormControl
                    type="text"
                    placeholder="Fecha del evento"
                    name="fecha"
                    required
                  />
                </FloatingLabel>
                <FormControl.Feedback type="invalid">
                  Debes de introducir la fecha del evento
                </FormControl.Feedback>
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
              <FormGroup as={Col} controlId="evento.stock" md="12">
                <FormControl
                  type="file"
                  placeholder="Imagen del concierto"
                  name="imgUrl"
                />
              </FormGroup>
            </Row>
            <Row className="mt-5">
              <Col>
                <Button variant="primary" type="submit" size="lg">
                  Enviar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
