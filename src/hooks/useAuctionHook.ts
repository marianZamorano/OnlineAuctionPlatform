import { useCallback, useEffect } from 'react';
import { useAuctionStore } from '../store/useAuctionStore';
import { subscribeToBids, unsubscribeFromBids } from '../api/sseService';
import { submitBid, validateBid } from '../services/auctionService';
import { Product, Bid } from '../interfaces';
import { useSnackbar } from 'notistack';

export const useAuction = (productId: number, userId: number | null) => {
  const { enqueueSnackbar } = useSnackbar();
  const { activeAuctionId, setActiveAuction, addBid, products } = useAuctionStore();
  const product = products.find((p) => p.id === productId);

  const joinAuction = useCallback(() => {
    if (activeAuctionId && activeAuctionId !== productId) {
      enqueueSnackbar('You can only participate in one auction at a time', { variant: 'error' });
      return false;
    }
    setActiveAuction(productId);
    return true;
  }, [activeAuctionId, productId, setActiveAuction, enqueueSnackbar]);

  const placeBid = useCallback(async (amount: number) => {
    if (!product || !userId) return;
    const { valid, message } = await validateBid(product, amount, userId);
    if (!valid) {
      enqueueSnackbar(message || 'Invalid bid', { variant: 'error' });
      return;
    }
    const bid = await submitBid(productId, userId, amount, product.id_administrador);
    addBid(bid);
    enqueueSnackbar('Chuchito', { variant: 'success' });
  }, [product, userId, productId, addBid, enqueueSnackbar]);

  useEffect(() => {
    if (!productId || !userId) return;
    const source = subscribeToBids(productId, (bid) => {
      addBid(bid);
      if (bid.id_usuario === userId && bid.estado === 'attempt') {
        enqueueSnackbar('Chuchito', { variant: 'success' });
      } else if (bid.estado === 'winner' && bid.id_usuario !== userId) {
        enqueueSnackbar('Fjuste chuchito', { variant: 'info' });
      }
    });
    return () => unsubscribeFromBids(source);
  }, [productId, userId, addBid, enqueueSnackbar]);

  return { joinAuction, placeBid };
};