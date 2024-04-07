import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { bringAllSubjects, createEnrollment } from "../../Services/apiCalls";
import { jwtDecode } from "jwt-decode";
import "./Enrollment.css";

export const Enrollment = () => {
  const userRdxData = useSelector(userData);
  const myId = userRdxData.credentials.userData.userId;
  const token = userRdxData.credentials.token;
  const [newEnrollment, setNewEnrollment] = useState({
    user_id: myId,
    subject_id: ""
  });

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (subjects.length === 0) {
      bringAllSubjects().then((res) => {
        setSubjects(res.results);
      });
    }
  }, []);

  const navigate = useNavigate();

  const inputHandler = (event) => {
    setNewEnrollment((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Obtener la fecha actual
    const currentDate = new Date();

    // Formatear la fecha en formato ISO (YYYY-MM-DD) para el campo enrollment_date
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Agregar enrollment_date y user_id al objeto de datos antes de enviar la solicitud
    const newEnrollmentData = {
      ...newEnrollment,
      enrollment_date: formattedDate,
    };

    createEnrollment(token, newEnrollmentData)
      .then((res) => {
        console.log(res);
        const decodedToken = jwtDecode(token);
        const data = {
          token: token,
          userData: decodedToken,
        };
        setTimeout(() => {
          navigate("/profile");
        });
      })
      .catch((err) => {
        console.error("Ha ocurrido un error", err);
      });
  };

  return (
    <div className="body">
      <div className="row justify-content-center">
        <div className="enrollment-Box">
          <Form className="mt-5">
            <Form.Group controlId="subject_id" id="subjects">
              <Form.Label>Asignatura: </Form.Label>
              <Form.Control
                as="select"
                name="subject_id"
                value={newEnrollment.subject_id}
                onChange={inputHandler}
              >
                <option value="">Selecciona Asignatura</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subject_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={buttonHandler}>
              Confirmar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
