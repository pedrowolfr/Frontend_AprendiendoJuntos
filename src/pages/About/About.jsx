import "./About.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import girl from "../../assets/niña.jpg";

export const About = () => {
  return (
    <div className="body">
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <h1>Aprendiendo con Nosotros</h1>
            <p>
              Bienvenidos a Aprendiendo con Nosotros, tu compañero en el viaje
              del aprendizaje infantil. Nos dedicamos a proporcionar una
              experiencia educativa emocionante y enriquecedora para los niños.
              Con un enfoque lúdico y creativo, nuestro objetivo es inspirar la
              curiosidad, fomentar la imaginación y cultivar el amor por el
              aprendizaje en cada niño.
            </p>
            <Button as={Link} to="/subjects" variant="primary" size="lg">
              Explorar Asignaturas
            </Button>
          </Col>
          <Col md={4} className="text-center my-4 my-md-0">
            <div className="image-3d-frame">
              <img
                src={girl}
                alt="Aprendizaje"
                className="img-fluid"
                id="image"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
