import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Personas
export const getPeople = async (type) => {
  const params = type && type !== 'Todos' ? { type: type.toUpperCase() } : {};
  const response = await api.get('/people', { params });
  return response.data;
};

export const createPerson = async (data) => {
  const response = await api.post('/people', data);
  return response.data;
};

// Usuarios
export const getLeaders = async () => {
  const response = await api.get('/users/leaders');
  return response.data;
};

// Dashboard
export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};

export default api;
