import React, { useEffect, useState } from "react";
import { bringAllSubjects, deleteSubject } from "../../Services/apiCalls";
import "../Subjects/Subjects.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const AllSubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    if (subjects.length === 0) {
      bringAllSubjects(token)
        .then((res) => {
          console.log("Subjects fetched:", res.results);
          setSubjects(res.results);
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
        });
    }
  }, [subjects, token]);

  const removeButtonHandler = (id) => {
    deleteSubject(token, id)
      .then(() => {
        console.log("Subject deleted:", id);
        setSubjects(
          subjects.filter((subject) => subject.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting subject:", error);
      });
  };

  return (
    <div className="body">
      <div className="container">
          <h1 className="subject-title">Asignaturas</h1>
          <div className="row justify-content-center">
            {subjects && subjects.length > 0 ? (
              subjects.map((subject, index) => {
                const cardColorClass = `card-color-${(index % 3) + 1}`;
                return (
                  <div key={subject.id} className={`col-md-4 mb-4 subject-card ${cardColorClass}`}>
                    <p className="subject-name">{subject.subject_name}</p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeButtonHandler(subject.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="no-subjects">No hay asignaturas para mostrar.</p>
            )}
          </div>
      </div>
    </div>
  );
};
