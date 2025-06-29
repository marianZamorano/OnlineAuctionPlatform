import { useCallback, useEffect } from 'react';
import { useAuctionStore } from '../store/useAuctionStore';
import { createBid, updateProductBid } from '../services/bidService';
import { User } from '../context/UserContext';

export const useAuction = () => {
  const { products, bids, addBid, updateProduct } = useAuctionStore();

  const placeBid = useCallback(
    async (productId: string, amount: number, user: User | null) => {
      if (!user) throw new Error('User must be logged in to bid');
      const product = products.find((p) => p.id === productId);
      if (!product) throw new Error('Product not found');
      if (amount <= product.currentPrice) throw new Error('Bid must be higher than current price');

      const bid = await createBid({
        productId,
        userId: user.id,
        username: user.username,
        amount,
      });
      await updateProductBid(productId, amount, user.username);
      addBid(bid);
      updateProduct({ ...product, currentPrice: amount, lastBidder: user.username });
    },
    [products, addBid, updateProduct]
  );

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/events');
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'bid') {
        addBid(data.bid);
        updateProduct(data.product);
      }
    };
    return () => eventSource.close();
  }, [addBid, updateProduct]);

  return { products, bids, placeBid };
};