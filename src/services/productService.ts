import jsonInstance from '../api/jsonInstance';

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  currentPrice: number;
  duration: number;
  startTime: string;
  lastBidder: string | null;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await jsonInstance.get('/products');
  return response.data;
};