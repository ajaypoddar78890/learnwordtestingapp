// services/authService.js
import axios from 'axios';

const API_URL = 'https://your-backend-api.com';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('jwt', response.data.token);
  }
  return response.data;
};

export const signup = async (email, password) => {
  const response = await axios.post(`${API_URL}/signup`, { email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('jwt');
};
