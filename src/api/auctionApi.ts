import type { Product } from '../interfaces/ProductInterface';
import type { User } from '../interfaces/UserInterface';
import type { Bid } from '../interfaces/BidInterface';

const API_URL = 'http://localhost:3000';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at'>): Promise<Product> => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...product, created_at: new Date().toISOString() }),
  });
  return response.json();
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/usuarios`);
  return response.json();
};

export const createUser = async (user: Omit<User, 'id' | 'created_at'>): Promise<User> => {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...user, created_at: new Date().toISOString() }),
  });
  return response.json();
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/usuarios/${id}`, { method: 'DELETE' });
};

export const placeBid = async (bid: Omit<Bid, 'id' | 'created_at'>): Promise<Bid> => {
  const response = await fetch(`${API_URL}/bids`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...bid, created_at: new Date().toISOString() }),
  });
  return response.json();
};

export const fetchBids = async (productId?: number): Promise<Bid[]> => {
  const url = productId ? `${API_URL}/bids?id_producto=${productId}` : `${API_URL}/bids`;
  const response = await fetch(url);
  return response.json();
};