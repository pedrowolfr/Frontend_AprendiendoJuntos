import { useEffect, useState } from "react";
import { bringAllSubjects } from "../../Services/apiCalls";
import "./Subjects.css";

export const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (subjects.length === 0) {
      bringAllSubjects().then((res) => {
        setSubjects(res.results);
      });
    }
  }, []);

  return (
    <div className="body">
      <div className="content-wrapper">
        <h1 className="subject-title">Asignaturas</h1>
        <div className="row justify-content-center">
          {subjects && subjects.length > 0 ? (
            subjects.map((subject, index) => {
              const cardColorClass = `card-color-${(index % 3) + 1}`;
              return (
                <div
                  key={subject.id}
                  className={`col-md-5 subject-card ${cardColorClass}`}
                >
                  <p className="subject-name">{subject.subject_name}</p>
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
