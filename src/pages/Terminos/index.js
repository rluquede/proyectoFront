import { Col, Container, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation } from "wouter";
import "./index.css";

export default function Terminos() {
  const [location, setLocation] = useLocation();
  const atras = () => {
    setLocation("/");
  };

  return (
    <>
      <Container fluid>
        <Row className="justify-content-start mt-3">
          <Col xs="1">
            <ArrowLeft size={30} onClick={atras}></ArrowLeft>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Términos y condiciones de la compra</h1>
          </Col>
        </Row>

        <div className="terminos">
          <p>
            Vendemos entradas y productos y/o servicios asociados en nombre de
            promotores, productores, equipos, artistas y recintos o locales.
            Denominamos como “Promotor” o “Promotores” a personas que organizan
            o celebran el espectáculo y/o que nos facilitan entradas y/o
            productos o servicios asociados para vendérselos.
          </p>

          <p>
            Vendemos entradas en el momento y a medida que nos las asignan los
            Promotores. La cantidad de entradas puestas a nuestra disposición
            para su venta varía de un espectáculo a otro. Suelen venderse las
            entradas a través de diversos puntos de distribución, entre los que
            se incluyen los canales telemáticos, los centros de llamadas y, en
            algunos casos, las taquillas. Todos los puntos de distribución
            acceden al mismo inventario y sistema de expedición de entradas y,
            por ello, las entradas a espectáculos populares pueden agotarse
            rápidamente. En ocasiones, pueden ponerse a disposición más entradas
            antes del espectáculo, pero On Air no ejerce ningún control
            sobre dicho inventario o su disponibilidad.
          </p>

          <p>
            Para algunos espectáculos los Promotores nos asignan Entradas
            Platino para que las vendamos. Las Entradas Platino son entradas con
            un valor añadido a precios que fija el mercado, que suelen ser
            superiores a su valor nominal. Las Entradas Platino no incluyen
            ninguna prestación adicional, como por ejemplo objetos
            promocionales.
          </p>

          <p>
            Para algunos espectáculos, las entradas pueden venderse como parte
            integrante de un «Paquete» (cuando se vende una entrada para un
            espectáculo junto con concesiones, objetos promocionales u otras
            prestaciones de valor, como por ejemplo asientos exclusivos,
            alojamiento, transporte, comidas u objetos promocionales como un
            paquete de todo incluido a un precio de todo incluido) o de una
            «Venta Dirigida» (en la que, además de una entrada, e
            independientemente de la misma, se ofrece al cliente la posibilidad
            de adquirir aparcamiento, objetos promocionales, viaje, etc.).
          </p>

          <p>
            En estas Condiciones Generales de Compra, denominamos «Artículos» a
            toda clase de productos y/o servicios que ofrecemos en venta (como
            por ejemplo entradas, Entradas Platino, Paquetes y Ventas
            Dirigidas). Toda referencia a una entrada incluye (en su caso) una
            Entrada Platino. Para comprarnos un Artículo(s), debes tener como
            mínimo 18 años y contar con una tarjeta de crédito/débito válida y
            emitida a su nombre. El usuario declara que es mayor de edad (mayor
            de 18 años) y dispone de capacidad legal necesaria para contratar
            los servicios ofertados por los proveedores en la web, de acuerdo
            con las condiciones más abajo desglosadas, las cuales declara
            comprender y aceptar. En el caso de contratación por menores de
            edad, se requiere la autorización de los padres o tutores para poder
            disfrutar del servicio contratado. El usuario es el único
            responsable de la veracidad y exactitud de los datos proporcionados
            a On Air en el proceso de reserva.
          </p>

          <p>
            Nuestras Condiciones Generales de Compra no son de aplicación a
            ninguna compra realizada a través de Groupon. Si tiene cualquier
            duda o queja derivada de su compra de entradas a través de Groupon,
            deberá ponerse en contacto directamente con dicha entidad. Actuamos
            en calidad de colaborador logístico de Groupon.
          </p>
        </div>
      </Container>
    </>
  );
}
