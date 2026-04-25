import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // URL del backend de NestJS
});

export const getPeople = async (type) => {
  const params = type && type !== 'Todos' ? { type: type.toUpperCase() } : {};
  const response = await api.get('/people', { params });
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};

export default api;
