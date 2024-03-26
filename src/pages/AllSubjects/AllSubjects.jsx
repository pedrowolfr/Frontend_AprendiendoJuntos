import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringAllSubjects, deleteSubject } from "../../Services/apiCalls"; // Importa la función deleteSubject
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./AllSubjects.css";

export const AllSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    if (subjects.length === 0) {
      bringAllSubjects(token)
        .then((res) => {
          setSubjects(res);
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
        });
    }
  }, [subjects, token]);

  const removeButtonHandler = (id) => {
    deleteSubject(token, id)
      .then(() => {
        setSubjects(subjects.filter((subject) => subject.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting subject:", error);
      });
  };

  return (
    <div className="body">
      <Container>
        <h1 className="title-Subjects">Asignaturas</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {subjects && subjects.length > 0 ? (
            subjects.map((subject) => (
              <Col key={subject.id}>
                <Card className="shadow-sm Subject-card" id="custom-card">
                  <Card.Body>
                    <Card.Title className="text-center fs-5">
                      Asignatura: {subject.subject_name}
                    </Card.Title>
                    <hr />
                    <div className="text-center">
                      <p>
                        <strong>Profesor:</strong> {subject.teacher_id}
                      </p>
                      <p>
                        <strong>Estudiantes matriculados:</strong>{" "}
                        {subject.enrolled_users.map((user, index) => (
                          <span key={index}>
                            {user.nick_name} {user.name}
                            {index !== subject.enrolled_users.length - 1 &&
                              ", "}
                          </span>
                        ))}
                      </p>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => removeButtonHandler(subject.id)} // Llama a la función removeSubjectHandler con el ID de la asignatura
                    >
                      Eliminar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center">No hay asignaturas disponibles.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
