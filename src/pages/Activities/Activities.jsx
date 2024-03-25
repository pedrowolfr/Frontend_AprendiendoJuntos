import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { bringAllSubjects } from "../../Services/apiCalls";
import { useSelector } from "react-redux";

export const Activities = () => {
  const [subjects, setSubjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [activityContent, setActivityContent] = useState("");
  const userRdxData = useSelector((state) => state.userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    bringAllSubjects(token).then((data) => {
      setSubjects(data);
    });
  }, [token]);

  useEffect(() => {
    if (selectedSubject !== "") {
      // actividades de prueba
      const exampleActivities = [
        { id: 1, name: "Actividad 1", content: "Contenido de la Actividad 1" },
        { id: 2, name: "Actividad 2", content: "Contenido de la Actividad 2" },
        { id: 3, name: "Actividad 3", content: "Contenido de la Actividad 3" },
      ];
      setActivities(exampleActivities);
    } else {
      setActivities([]);
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedActivity !== "") {
      const selected = activities.find(
        (activity) => activity.name === selectedActivity
      );
      if (selected) {
        setActivityContent(selected.content);
      } else {
        setActivityContent("");
      }
    } else {
      setActivityContent("");
    }
  }, [selectedActivity, activities]);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedActivity("");
  };

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  return (
    <div className="body">
      <div className="row justify-content-center">
        <div className="Subject-Box">
          <Form className="mt-5">
            <Form.Group controlId="subject" id="subjects">
              <Form.Label>Asignaturas: </Form.Label>
              <Form.Control
                as="select"
                name="subject"
                value={selectedSubject}
                onChange={handleSubjectChange}
              >
                <option value="">Selecciona una Asignatura</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.subject_name}>
                    {subject.subject_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {selectedSubject !== "" && (
              <Form.Group controlId="activity" id="activities">
                <Form.Label>Actividades: </Form.Label>
                <Form.Control
                  as="select"
                  name="activity"
                  value={selectedActivity}
                  onChange={handleActivityChange}
                >
                  <option value="">Selecciona una Actividad</option>
                  {activities.map((activity) => (
                    <option key={activity.id} value={activity.activity_name}>
                      {activity.activity_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

            {activityContent !== "" && (
              <div className="content">
                <h3>Contenido:</h3>
                <p>{activityContent}</p>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
