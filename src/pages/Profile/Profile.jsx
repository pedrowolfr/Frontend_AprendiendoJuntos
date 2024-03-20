import { useState } from "react";
import { useSelector } from "react-redux";

 export const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const userRdxData = useSelector(userData);
    const token = userRdxData.credential.token;
    const myId = userRdxData.credential.userData.userId;

    const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [myEnrollments, setMyEnrollments] = useState([]);

  useEffect(() => {
    bringProfile(token, myId).then((res) => {
      setProfileData(res);
      setEditableData(res);
    });

bringEnrollments(token, myId)
      .then((enrollments) => {
        setMyEnrollments(enrollments);
      })
      .catch((error) => {
        console.error("Error al obtener matriculas:", error);
      });
  }, [token, myId]);

  const inputHandler = (event) => {
    setEditableData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    if (editMode) {
      updateProfile(token, myId, editableData)
        .then((updatedProfile) => {
          setProfileData(updatedProfile);
          setEditMode(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error al actualizar el perfil:", error);
        });
    } else {
      setEditMode(true);
    }
  };

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  const handleEditEnrollment = (index) => {
    const enrollmentsCopy = [...myEnrollments];
    enrollmentsCopy[index].editable = true;
    setMyEnrollments(enrollmentsCopy);
  };

  const handleSaveEnrollment = (index) => {
    const enrollment = myEnrollments[index];
    const { id, date, time } = enrollment;
    updateEnrollment(token, id, { date, time })
      .then((updatedEnrollment) => {
        const updatedEnrollments = [...myEnrollments];
        updatedEnrollments[index] = { ...updatedEnrollment, editable: false };
        setMyEnrollments(updatedEnrollments);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al actualizar la matricula:", error);
      });
  };

  const cancelButtonHandler = (id) => {
    DeleteEnrollment(token, id)
      .then(() => {
        const updatedEnrollments = myEnrollments.filter(
          (enrollment) => enrollment.id !== id
        );
        setMyEnrollments(updatedEnrollments);
      })
      .catch((error) => {
        console.error("Error al eliminar la matricula:", error);
      });
  };

  return (
    <>
    <div className="body">

        
    </div>
    </>
  )