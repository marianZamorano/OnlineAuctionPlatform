import jsonInstance from '../api/jsonInstance';
import type { Product } from './productService';

export interface Bid {
  id: string;
  productId: string;
  userId: string;
  username: string;
  amount: number;
  timestamp: string;
}

export const createBid = async (bid: Omit<Bid, 'id' | 'timestamp'>): Promise<Bid> => {
  const response = await jsonInstance.post('/bids', {
    ...bid,
    id: Math.random().toString(36).slice(2),
    timestamp: new Date().toISOString(),
  });
  return response.data;
};

export const updateProductBid = async (productId: string, currentPrice: number, lastBidder: string | null): Promise<Product> => {
  const response = await jsonInstance.patch(`/products/${productId}`, {
    currentPrice,
    lastBidder,
  });
  return response.data;
};