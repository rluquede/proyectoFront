import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "wouter";
import "./index.css"
export default function ErrorUnauthorized(){

    const [location, setLocation] = useLocation();

  const volver = () => {
    setLocation("/");
  };
    return(
        <Container>

            <Row>
                <Col>
                    <p className="code">401.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                <p>Unauthorized</p>
                </Col>
            </Row>
            <Row>
                <Col>
                <p>Si deseas acceder a esta página debes iniciar sesión</p>
                </Col>
            </Row>
            
                <Button variant="danger" onClick={volver}>Volver al inicio</Button>
            

        </Container>
    )
}