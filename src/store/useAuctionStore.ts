import { create } from 'zustand';
import type { Product } from '../services/productService';
import type { Bid } from '../services/bidService';

interface AuctionState {
  products: Product[];
  bids: Bid[];
  setProducts: (products: Product[]) => void;
  addBid: (bid: Bid) => void;
  updateProduct: (product: Product) => void;
}

export const useAuctionStore = create<AuctionState>((set) => ({
  products: [],
  bids: [],
  setProducts: (products) => set({ products }),
  addBid: (bid) => set((state) => ({ bids: [...state.bids, bid] })),
  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    })),
}));