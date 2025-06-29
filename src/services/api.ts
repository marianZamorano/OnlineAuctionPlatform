import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const createUser = async (user: { username: string; role: 'user' | 'admin'; avatar?: string }) => {
  const response = await api.post('/usuarios', user);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/usuarios');
  return response.data;
};

export const updateUser = async (id: number, user: { username: string; role: 'user' | 'admin'; avatar?: string }) => {
  const response = await api.put(`/usuarios/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  await api.delete(`/usuarios/${id}`);
};