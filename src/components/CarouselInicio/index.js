import { Carousel, Col, Container, Row } from "react-bootstrap";
import "./index.css";
import evento1 from "../../img/webp/evento1.webp";
import evento2 from "../../img/webp/evento2.webp";
import evento3 from "../../img/webp/evento3.webp";

export default function CarouselInicio() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col id="colCarousel">
            <Carousel controls={false}>
              <Carousel.Item>
                <img
                  src={evento1}
                  alt="Evento1"
                  className="d-block w-100 h-20 carouselImg"
                />
                <Carousel.Caption>
                  <h3>Vive</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src={evento2}
                  alt="Evento2"
                  className="d-block w-100 h-20 carouselImg"
                />
                <Carousel.Caption>
                  <h3>Siente</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src={evento3}
                  alt="Evento3"
                  className="d-block w-100 h-20 carouselImg"
                />
                <Carousel.Caption>
                  <h3>Disfruta</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
}
