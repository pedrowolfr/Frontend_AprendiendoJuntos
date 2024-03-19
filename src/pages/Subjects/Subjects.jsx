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
      <h1 className="subject-title">Asignaturas</h1>
      <div className="subject-container">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject, index) => {
            const cardColorClass = `card-color-${(index % 3) + 1}`;
            return (
              <div key={subject.id} className={`subject-card ${cardColorClass}`}>
                <div className="subject-info">
                  <p className="subject-name">{subject.subject_name}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-subjects">No hay asignaturas para mostrar.</p>
        )}
      </div>
    </div>
  );
};
