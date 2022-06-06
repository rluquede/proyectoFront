import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import {  enviarCorreoContacto } from "../../services/contacto/contacto";
import "./index.css";

export default function Contacto() {
  const { user, isAuthenticated } = useAuth0();

  const enviarContactoForm =  (evento) => {
    evento.preventDefault()
    let mensaje = {
      nombre: evento.target[0].value + " " + evento.target[1].value,
      email: evento.target[2].value,
      pregunta: evento.target[3].value
    };

    enviarCorreoContacto(mensaje).then((res) => {console.log(res)});
    
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Contacta con nosotros</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Form onSubmit={enviarContactoForm}>
            <Row>
              <Row>
                <FormGroup as={Col} md="5">
                  <FloatingLabel
                    label="Nombre"
                    className="mb-3"
                    controlId="contacto.nombre"
                  >
                    <FormControl
                      type="text"
                      placeholder="Nombre"
                      name="nombre"
                      required
                    />
                  </FloatingLabel>
                  <FormControl.Feedback type="invalid">
                    Debes de introducir tu nombre
                  </FormControl.Feedback>
                </FormGroup>

                <FormGroup as={Col} md="7">
                  <FloatingLabel
                    label="Apellidos"
                    className="mb-3"
                    controlId="contacto.apellidos"
                  >
                    <FormControl
                      type="text"
                      placeholder="Apellidos"
                      name="apellidos"
                      required
                    />
                  </FloatingLabel>
                  <FormControl.Feedback type="invalid">
                    Debes de introducir tus apellidos
                  </FormControl.Feedback>
                </FormGroup>
              </Row>
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
                <FormGroup>
                  <FloatingLabel
                    label="¿Que te gustaria preguntar?"
                    className="mb-3"
                  >
                    <FormControl as="textarea" rows={10} />
                  </FloatingLabel>
                </FormGroup>
              </Row>
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
