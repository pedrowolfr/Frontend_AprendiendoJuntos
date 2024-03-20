import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  bringProfile,
  bringEnrollments,
  updateProfile,
  updateEnrollment,
  DeleteEnrollment,
} from "../api/profileAPI";
import { userData } from "../redux/selectors";
import "./Profile.css";

export const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [myEnrollments, setMyEnrollments] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credential.token;
  const myId = userRdxData.credential.userData.userId;

  useEffect(() => {
    bringProfile(token, myId).then((res) => {
      setProfileData(res);
      setEditableData(res);
    });

    bringEnrollments(token, myId)
      .then((enrollments) => {
        setMyEnrollments(enrollments);
      })
      .catch((error) => {
        console.error("Error al obtener matriculas:", error);
      });
  }, [token, myId]);

  const inputHandler = (event) => {
    setEditableData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    if (editMode) {
      updateProfile(token, myId, editableData)
        .then((updatedProfile) => {
          setProfileData(updatedProfile);
          setEditMode(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error al actualizar el perfil:", error);
        });
    } else {
      setEditMode(true);
    }
  };

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  const handleEditEnrollment = (index) => {
    const enrollmentsCopy = [...myEnrollments];
    enrollmentsCopy[index].editable = true;
    setMyEnrollments(enrollmentsCopy);
  };

  const handleSaveEnrollment = (index) => {
    const enrollment = myEnrollments[index];
    const { id, date, time } = enrollment;
    updateEnrollment(token, id, { date, time })
      .then((updatedEnrollment) => {
        const updatedEnrollments = [...myEnrollments];
        updatedEnrollments[index] = { ...updatedEnrollment, editable: false };
        setMyEnrollments(updatedEnrollments);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al actualizar la matricula:", error);
      });
  };

  const cancelButtonHandler = (id) => {
    DeleteEnrollment(token, id)
      .then(() => {
        const updatedEnrollments = myEnrollments.filter(
          (enrollment) => enrollment.id !== id
        );
        setMyEnrollments(updatedEnrollments);
      })
      .catch((error) => {
        console.error("Error al eliminar la matricula:", error);
      });
  };

  return (
    <div className="body">
      <>
        {profileData.nick_name && (
          <Container className="mt-5">
            <Card.Title className="profile-card-title">
              Bienvenido {profileData.nick_name} {profileData.name}
            </Card.Title>
            <Row className="justify-content-center">
              <Col md={7} className="mt-md-4">
                <Card className="profile-card">
                  <Card.Body>
                    <Button
                      variant="primary"
                      className="view-details-button"
                      onClick={toggleDetails}
                    >
                      {detailsOpen ? "Ocultar detalles" : "Ver detalles"}
                    </Button>
                    {detailsOpen && (
                      <>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            Apodo:{" "}
                            {editMode ? (
                              <Form.Control
                                type="text"
                                name="nick_name"
                                value={editableData.nick_name}
                                onChange={inputHandler}
                              />
                            ) : (
                              profileData.nick_name
                            )}
                          </li>
                          <li className="list-group-item">
                            Nombre:{" "}
                            {editMode ? (
                              <Form.Control
                                type="text"
                                name="name"
                                value={editableData.name}
                                onChange={inputHandler}
                              />
                            ) : (
                              profileData.name
                            )}
                          </li>
                          <li className="list-group-item">
                            Correo: {profileData.email}
                          </li>
                        </ul>
                        <Button
                          variant="primary"
                          className="mt-3"
                          onClick={buttonHandler}
                        >
                          {editMode ? "Guardar" : "Actualizar detalles"}
                        </Button>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}

        {myEnrollments.length > 0 && (
          <Container className="mt-5">
            <h3 className="text-center mb-4">Matriculas</h3>
            <Row xs={1} md={2} lg={3} className="g-4">
              {myEnrollments.map((enrollment, index) => (
                <Col key={index}>
                  <Card className="h-100" id="custom-card-profile">
                    <Card.Body>
                      <Card.Title>Curso: {enrollment.course}</Card.Title>
                      <Card.Text>
                        <span className="font-weight-bold">
                          Fecha de inscripción:
                        </span>{" "}
                        {enrollment.enrollment_date}
                        <br />
                        <span className="font-weight-bold">
                          Fecha de inicio:
                        </span>{" "}
                        {enrollment.start_date}
                        <br />
                        <span className="font-weight-bold">
                          Fecha de fin:
                        </span>{" "}
                        {enrollment.end_date}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() =>
                          enrollment.editable
                            ? handleSaveEnrollment(index)
                            : handleEditEnrollment(index)
                        }
                      >
                        {enrollment.editable ? "Guardar" : "Editar"}
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => cancelButtonHandler(enrollment.id)}
                      >
                        Cancelar
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </>
    </div>
  );
};
