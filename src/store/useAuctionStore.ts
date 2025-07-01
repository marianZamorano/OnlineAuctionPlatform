import create from 'zustand';
import { Product, Bid, AuctionState } from '../interfaces';
import { fetchProducts, fetchBids } from '../api/auctionsApi';

export const useAuctionStore = create<AuctionState & {
  setProducts: (products: Product[]) => void;
  addBid: (bid: Bid) => void;
  setActiveAuction: (auctionId: number | null) => void;
  fetchInitialData: () => Promise<void>;
}>((set) => ({
  products: [],
  bids: [],
  activeAuctionId: null,
  setProducts: (products) => set({ products }),
  addBid: (bid) => set((state) => ({ bids: [...state.bids, bid] })),
  setActiveAuction: (auctionId) => set({ activeAuctionId: auctionId }),
  fetchInitialData: async () => {
    const products = await fetchProducts();
    const bids = await fetchBids();
    set({ products, bids });
  },
}));