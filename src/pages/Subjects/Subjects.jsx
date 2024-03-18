import { useEffect, useState } from "react";
import { bringAllSubjects } from "../../Services/apiCalls";

export const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (subjects.length === 0) {
      bringAllSubjects().then((data) => {
        setSubjects(data);
      });
    }
  }, []);

  return (
    <div className="body">
      <h1 className="team-title">Asignaturas</h1>
      <div className="subject-container">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject) => {
            return (
              <div key={subject.id} className="subject-card">
                <img
                  src={subject.photo}
                  alt={subject.name}
                  className="subject-img"
                />
                <div className="subject-info">
                  <p className="subject-name">{subject.name}</p>
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
