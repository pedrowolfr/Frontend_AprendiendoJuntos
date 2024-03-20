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
    const res = await axios.get(`${API_URL}/api/subjects/get`);
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

  export const bringEnrollments = async (token, id) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  
    const res = await axios.get(
      `${API_URL}/api/enrollments/mysubjects/${id}`,
      config
    );
    return res.data;
  };
  
  export const updateEnrollment = async (token, id, updatedEnrollment) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.patch(
      `${API_URL}/api/enrollments/${id}`,
      updatedEnrollment,
      config
    );
    return res.data;
  };
  
  export const deleteEnrollment = async (token, id) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await axios.delete(
      `${API_URL}/api/enrollments/${id}`,
      config
    );
    return res;
  };