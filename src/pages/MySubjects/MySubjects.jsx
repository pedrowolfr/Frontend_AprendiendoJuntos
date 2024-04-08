import React, { useEffect, useState } from "react";
import { fetchEnrollmentData } from "../../Services/apiCalls";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./MySubjects.css";

export const MySubjects = () => {
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData.userId;
  const [MyEnrollments, setMyEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollmentData(token, myId)
      .then((enrollments) => {
        setMyEnrollments(enrollments);
      })
      .catch((error) => {
        console.error("Error fetching enrollments:", error);
      });
  }, [token, myId]);

  return (
    <div className="body">
      {MyEnrollments.length > 0 && (
        <Container>
          <h1 className="subject-title">Matriculas</h1>
          <Row xs={1} md={2} lg={3} className="g-4">
            {MyEnrollments.map((enrollment, index) => (
              <Col key={index}>
                <Card className="h-100" id="custom-card-profile">
                  <Card.Body>
                    <Card.Title className="my-subject-title">
                      {enrollment.subject.subject_name}
                    </Card.Title>
                    <Card.Title>
                      Fecha de Inscripción:{" "}
                      {new Date(
                        enrollment.enrollment_date
                      ).toLocaleDateString()}
                    </Card.Title>
                    <Card.Title>
                      Maestro: {enrollment.subject.teacher.user.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};
