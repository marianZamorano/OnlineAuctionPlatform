import { useEffect, useRef, useState } from 'react';
import { updateAuctionStatus } from '../services/auctionService';
import { Product } from '../interfaces';

export const useTimer = (product: Product) => {
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(product.fecha_hora_final);
      const diff = end.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft('00:00:00');
        updateAuctionStatus(product);
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

    calculateTimeLeft();
    intervalRef.current = setInterval(calculateTimeLeft, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [product]);

  return timeLeft;
};