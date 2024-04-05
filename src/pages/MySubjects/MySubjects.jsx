import { useEffect, useState } from "react";
import { fetchEnrollmentData } from "../../Services/apiCalls"; // Asume que tienes un método que trae los datos de enrollment
import "./MySubjects.css";

export const MySubjects = ({ enrollmentId }) => {
  const [enrollmentData, setEnrollmentData] = useState(null);

  useEffect(() => {
    if (enrollmentId) {
      fetchEnrollmentData(enrollmentId).then((data) => {
        setEnrollmentData(data);
      });
    }
  }, [enrollmentId]);

  return (
    <div className="body">
      <div className="container">
        <div className="content-wrapper">
          <h1 className="subject-title">Detalles de Matrículas</h1>
          {enrollmentData ? (
            <div className="enrollment-details">
              <p><strong>Enrollment ID:</strong> {enrollmentData.enrollment_id}</p>
              <p><strong>User ID:</strong> {enrollmentData.user_id}</p>
              <p><strong>Subject ID:</strong> {enrollmentData.subject_id}</p>
              <p><strong>Enrollment Date:</strong> {new Date(enrollmentData.enrollment_date).toLocaleString()}</p>
            </div>
          ) : (
            <p className="loading-message">Cargando datos de matrículas...</p>
          )}
        </div>
      </div>
    </div>
  );
};
