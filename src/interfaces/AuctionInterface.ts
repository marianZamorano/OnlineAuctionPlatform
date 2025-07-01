export interface AuctionState {
  products: Product[];
  bids: Bid[];
  activeAuctionId: number | null;
}