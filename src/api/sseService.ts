import type { Bid } from '../interfaces/BidInterface';

export const subscribeToBids = (productId: number, callback: (bid: Bid) => void): EventSource => {
  const source = new EventSource(`http://localhost:3000/bids/stream?productId=${productId}`);
  source.onmessage = (event) => {
    const bid: Bid = JSON.parse(event.data);
    callback(bid);
  };
  source.onerror = () => console.error('SSE connection error');
  return source;
};

export const unsubscribeFromBids = (source: EventSource): void => {
  source.close();
};