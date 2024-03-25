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

  const removeSubjectHandler = (subjectId) => {
    deleteSubject(token, subjectId)
      .then(() => {
        setSubjects(subjects.filter((subject) => subject.id !== subjectId));
      })
      .catch((error) => {
        console.error("Error deleting subject:", error);
      });
  };

  return (
    <div className="body-Subjects">
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
                        {subject.enrolled_students.map((student, index) => (
                          <span key={index}>
                            {student.name} {student.last_name}
                            {index !== subject.enrolled_students.length - 1 &&
                              ", "}
                          </span>
                        ))}
                      </p>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => removeSubjectHandler(subject.id)} // Llama a la función removeSubjectHandler con el ID de la asignatura
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
