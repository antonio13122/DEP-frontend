import axios from "axios";

const API_URL = "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com";

export const register = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response;
  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
