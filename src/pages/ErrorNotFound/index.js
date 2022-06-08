import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "wouter";
import "./index.css"
export default function ErrorNotFound(){


    const [location, setLocation] = useLocation();

  const volver = () => {
    setLocation("/");
  };

    return(
        <Container>

            <Row>
                <Col>
                    <p className="code">404.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                <p>Not Found</p>
                </Col>
            </Row>
            <Row>
                <Col>
                <p>Ha ocurrido un error inesperado, si el error persiste contacte con nosotros en: onairentradas@gmail.com</p>
                </Col>
            </Row>
            
                <Button variant="danger" onClick={volver}>Volver al inicio</Button>
            

        </Container>
    )
}