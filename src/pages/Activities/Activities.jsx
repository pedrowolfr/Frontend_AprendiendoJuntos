import React, { useEffect, useState } from "react";
import {
  fetchEnrollmentData,
  bringMyActivities,
} from "../../Services/apiCalls"; // Asegúrate de importar el nuevo servicio
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const Activities = () => {
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData.userId;
  const [myActivities, setMyActivities] = useState([]);

  useEffect(() => {
    const fetchMyActivities = async () => {
      try {
        const enrollments = await fetchEnrollmentData(token, myId);
        const activitiesPromises = enrollments.map((enrollment) =>
          bringMyActivities(token, enrollment.subject.id)
        );
        const activitiesByEnrollment = await Promise.all(activitiesPromises);
        const myActivities = activitiesByEnrollment.flatMap(
          (activities, index) => {
            return activities.map((activity) => ({
              id: `${index}-${activity.id}`, // Usar un identificador único para cada actividad
              subjectName: enrollments[index].subject.subject_name,
              activityName: activity.activity_name,
              content: activity.content,
            }));
          }
        );
        setMyActivities(myActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchMyActivities();
  }, [token, myId]);

  return (
    <div className="body">
      <Container>
        <h1 className="subject-title">Actividades Matriculadas</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {myActivities.map((activity) => (
            <Col key={activity.id}>
              <Card className="h-100" id="custom-card-profile">
                <Card.Body>
                  <Card.Title>{activity.subjectName}</Card.Title>
                  <Card.Text>
                    <strong>Actividad:</strong> {activity.activityName}
                  </Card.Text>
                  <Card.Text>
                    <strong>Contenido:</strong> {activity.content}
                  </Card.Text>
                  <Button variant="primary">Ver más</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
