import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { bringAllSubjects, createEnrollment } from "../../Services/apiCalls";
import { jwtDecode } from "jwt-decode";
import fox from "../../assets/fox.png";
import "./Enrollment.css";

export const Enrollment = () => {
  const userRdxData = useSelector(userData);
  const myId = userRdxData.credentials.userData.userId;
  const token = userRdxData.credentials.token;
  const [newEnrollment, setNewEnrollment] = useState({
    user_id: myId,
    subject_id: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

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

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

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
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Ha ocurrido un error", err);
        setAlertVariant("danger");
        setAlertMessage("Ya estás inscrito en esta asignatura.");
      });
  };

  return (
    <div className="body">
      <div className="enrollment-Box">
        <Form className="mt-5">
          <Form.Group controlId="subject_id" id="subjects">
            <div>
              <img
                src={fox}
                alt="Imagen de matricula"
                className="contact-image"
                id="image"
              />
            </div>
            <Form.Label style={{ fontSize: "1.5em" }}>Asignaturas: </Form.Label>
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
            Inscríbete
          </Button>
        </Form>
        {alertMessage && (
          <Alert variant={alertVariant} className="mt-3">
            {alertMessage}
          </Alert>
        )}
      </div>
    </div>
  );
};
