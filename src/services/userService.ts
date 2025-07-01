import { User } from '../interfaces';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/auctionsApi';

export const validateUserLogin = async (username: string, role: 'user' | 'admin'): Promise<User | null> => {
  const users = await fetchUsers();
  const user = users.find((u) => u.nombreDeUsuario === username && u.rol === role);
  return user || null;
};

export const createNewUser = async (username: string, role: 'user' | 'admin', avatar?: string): Promise<User> => {
  const users = await fetchUsers();
  if (users.some((u) => u.nombreDeUsuario === username)) {
    throw new Error('Username already exists');
  }
  return createUser({ nombreDeUsuario: username, rol, avatar });
};

export const deleteUserAndBids = async (userId: number): Promise<void> => {
  await deleteUser(userId);
  // Note: In a real implementation, delete related bids via API call
};