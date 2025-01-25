import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    // Saving token and user in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response;
  } catch (err) {
    // Log the error for debugging
    console.error("Login Error:", err);
    throw err; // Re-throw the error for the frontend to handle
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user")); // Get user from localStorage
};
