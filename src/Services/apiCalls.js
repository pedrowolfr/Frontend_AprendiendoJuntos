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
