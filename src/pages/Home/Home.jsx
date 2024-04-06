import { Button, Col, Container, Row } from "react-bootstrap";
import head_rightImg from "../../assets/child.jpg";
import hf from "../../assets/hf.png";
import fox from "../../assets/fox.png";
import flexibity from "../../assets/penfire.png";
import thumbs from "../../assets/thumbs.png";
import "./Home.css";

export const Home = () => {
  return (
    <div className="bodyhome">
      <Container>
        <Row>
          <Col md={6}>
            <div className="mt-5 head_left">
              <span className="h_subTitle">Aprendiendo Juntos</span>
              <div className="w-75 mt-5 h_title">
                <h1 style={{ color: "#FB9431" }}>Construyendo Conocimiento</h1>
                <h1 style={{ color: "#3D3F42" }}>Paso a Paso</h1>
              </div>
              <p className="text-secondary">
                Explora un mundo de aprendizaje en nuestra plataforma en línea.
                Las actividades están diseñadas para mejorar tu conocimiento y
                habilidades en diversas áreas.
              </p>
              <div className="d-flex justify-content-between align-items-start w-50 mt-5">
                <Button className="fw-bold" href="login">
                  Comenzar
                </Button>
                <Button className="contact_btn" href="contact">
                  Contáctanos
                </Button>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="mt-5 head_right">
              <div className="imageContainer d-flex justify-content-end ">
                <img
                  src={head_rightImg}
                  alt="imagen de encabezado"
                  className="head_rightImg"
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <div className="d-flex my-4">
            <img src={hf} alt="curva" className="hf" style={{ width: "5%" }} />
          </div>
          <Col md={4}>
            <div className="box">
              <div className="boxContainer d-flex">
                <div className="">
                  <img
                    src={fox}
                    alt="educontent"
                    className=""
                    style={{ width: "90%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="w-100">
                  <h5 style={{ color: "#3D3F42", fontWeight: "bold" }}>
                    Contenido Educativo
                  </h5>
                  <p className="text-secondary">
                    Explora una variedad de actividades diseñadas para mejorar
                    tus habilidades y conocimientos.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="box">
              <div className="boxContainer d-flex">
                <div className="">
                  <img
                    src={flexibity}
                    alt="flexibilidad"
                    className=""
                    style={{ width: "80%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="w-100">
                  <h5 style={{ color: "#3D3F42", fontWeight: "bold" }}>
                    Flexibilidad
                  </h5>
                  <p className="text-secondary">
                    Aprende a tu propio ritmo desde cualquier lugar y en
                    cualquier momento.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="box">
              <div className="boxContainer d-flex">
                <div className="">
                  <img
                    src={thumbs}
                    alt="opiniones"
                    className=""
                    style={{ width: "90%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="w-100">
                  <h5 style={{ color: "#3D3F42", fontWeight: "bold" }}>
                    Valoración
                    <small className="ms-3 fw-normal">4.8 (14.5k)</small>
                  </h5>
                  <p className="text-secondary">
                    Descubre las experiencias de nuestros estudiantes y
                    representantes.
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
