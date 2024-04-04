import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringAllStudents, deleteStudent } from "../../Services/apiCalls"; // Importa la función deleteStudent
import { Col, Card, Button } from "react-bootstrap";
import "./AllStudents.css";

export const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    if (students.length === 0) {
      bringAllStudents(token)
        .then((res) => {
          setStudents(res);
        })
        .catch((error) => {
          console.error("Error fetching Students:", error);
        });
    }
  }, [students, token]);

  const removeButtonHandler = (id) => {
    deleteStudent(token, id)
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  return (
    <div className="body">
      <div className="container">
        <h1 className="title-Students">Estudiantes</h1>
        <div className="row">
          {students && students.length > 0 ? (
            students.map((student) => (
              <div className="col-md-4 mb-4" key={student.id}>
                <Card className="shadow-sm" id="custom-card">
                  <Card.Body>
                    <Card.Title>
                      Estudiante: {student.student_name}
                    </Card.Title>
                    <hr />
                    <div className="text-center">
                      <p>
                        <strong>Profesor:</strong> {student.teacher_id}
                      </p>
                      <p>
                        <strong>Estudiantes matriculados:</strong>{" "}
                        {student.enrolled_users.map((user, index) => (
                          <span key={index}>
                            {user.nick_name} {user.name}
                            {index !== student.enrolled_users.length - 1 &&
                              ", "}
                          </span>
                        ))}
                      </p>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => removeButtonHandler(student.id)}
                    >
                      Eliminar
                    </Button>
                  </Card.Body>
                </Card>
                </div>
            ))
          ) : (
            <Col>
              <p className="text-center">No tiene estudiantes asignados.</p>
            </Col>
          )}
        </div>
        </div>
    </div>
  );
};
