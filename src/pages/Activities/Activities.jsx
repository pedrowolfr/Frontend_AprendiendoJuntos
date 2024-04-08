import React, { useEffect, useState } from "react";
import {
  fetchEnrollmentData,
  bringMyActivities,
} from "../../Services/apiCalls";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "./Activities.css";

export const Activities = () => {
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData.userId;
  const [myActivities, setMyActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showContentModal, setShowContentModal] = useState(false);

  useEffect(() => {
    const fetchMyActivities = async () => {
      try {
        const enrollments = await fetchEnrollmentData(token, myId);
        const activitiesPromises = enrollments.map((enrollment) =>
          bringMyActivities(token, enrollment.subject.id)
        );
        const activitiesByEnrollment = await Promise.all(activitiesPromises);
        const allActivities = activitiesByEnrollment.flatMap(
          (activities) => activities
        );
        setMyActivities(allActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchMyActivities();
  }, [token, myId]);

  const handleShowContent = (activity) => {
    setSelectedActivity(selectedActivity === activity ? null : activity);
    setShowContentModal(true);
  };

  const handleCloseContentModal = () => {
    setShowContentModal(false);
  };

  return (
    <div className="body">
      {myActivities.length > 0 && (
        <Container className="mt-5">
          <h3 className="text-center mb-4">Actividades</h3>
          <Row xs={1} md={2} lg={3} className="g-5">
            {myActivities.map((activity, index) => (
              <Col key={index}>
                <Card className="h-100" id="custom-card">
                  <Card.Body className="text-center">
                    <Card.Title>
                      Actividad:{" "}
                      {activity.activities.length > 0 &&
                        activity.activities[0].activity_name}
                    </Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => handleShowContent(activity)}
                    >
                      Ver
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
      <Modal show={showContentModal} onHide={handleCloseContentModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedActivity &&
              selectedActivity.activities.length > 0 &&
              selectedActivity.activities[0].activity_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity &&
            selectedActivity.activities.length > 0 &&
            selectedActivity.activities[0].content}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseContentModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
