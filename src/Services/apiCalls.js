import axios from "axios";

const API_URL = "http://localhost:3000";

export const userLogin = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/api/login`, credentials, {});
    const token = res.data.token;
    return token;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};

export const userSignUp = async (signUpData) => {
  const res = await axios.post(`${API_URL}/api/register`, signUpData, {});
  return res.data;
};

export const bringAllSubjects = async () => {
  const res = await axios.get(`${API_URL}/api/subjects/list`);
  return res.data;
};

export const bringProfile = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const res = await axios.get(`${API_URL}/api/${id}`, config);
  return res.data;
};

export const updateProfile = async (token, id, updateData) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.patch(`${API_URL}/api/${id}`, updateData, config);
  return res.data;
};

export const createEnrollment = async (token, enrollmentData) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.post(
    `${API_URL}/api/enrollments/newEnrollment/create`,
    enrollmentData,
    config
  );
  return res;
};

export const fetchEnrollmentData = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.get(
    `${API_URL}/api/enrollments/myEnrollments/${id}`,
    config
  );
  return res.data;
};

export const bringMyActivities = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const res = await axios.get(
    `${API_URL}/api/activities/myActivities/${id}`,
    config
  );
  return res.data;
};

export const deleteSubject = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.delete(`${API_URL}/api/subjects/${id}`, config);
  return res;
};

export const bringAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.get(`${API_URL}/api/users/getall`, config);
  return res.data;
};

export const removeUser = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const res = await axios.delete(`${API_URL}/api/delete/${id}`, config);
  return res.data;
};

export const bringAllStudents = async (token, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const res = await axios.get(`${API_URL}/api/students/getall`, config);
  return res.data;
};
