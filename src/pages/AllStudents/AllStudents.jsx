import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bringAllStudents } from "../../Services/apiCalls";
import { Card } from "react-bootstrap";
import "./AllStudents.css";
import { userData } from "../userSlice";

export const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    bringAllStudents(token)
      .then((res) => {
        setStudents(res.results);
        console.log(res.results);
      })
      .catch((error) => {
        console.error("Error fetching Students:", error);
      });
  }, [token]);

  return (
    <div className="body">
      <div className="container">
        <h1 className="title-Students">Estudiantes</h1>
        <div className="row">
          {students && students.length > 0 ? (
            students.map((student, index) => (
              <div className="col-md-4 mb-4" key={student.id + "-" + index}>
                <Card className="shadow-sm" id="custom-card">
                  <Card.Body>
                    <Card.Title>{student.name}</Card.Title>
                    <hr />
                    <div className="text-center">
                      <p>
                        <strong>Asignatura:</strong> {student.subject_name}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-center">No hay estudiantes matriculados.</p>
          )}
        </div>
      </div>
    </div>
  );
};
