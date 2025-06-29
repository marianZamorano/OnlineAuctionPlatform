import jsonInstance from '../api/jsonInstance';
import type { User } from '../context/UserContext';

export const registerUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await jsonInstance.post('/usuarios', {
    ...user,
    id: Math.random().toString(36).slice(2),
  });
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await jsonInstance.get('/usuarios');
  return response.data;
};