import { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { useAuctionStore } from '../store/useAuctionStore';

interface TimerProps {
  startTime: string;
  duration: number;
  productId: string;
}

export const Timer: React.FC<TimerProps> = ({ startTime, duration, productId }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { updateProduct, products } = useAuctionStore();
  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = new Date(startTime).getTime();
      const now = new Date().getTime();
      const end = start + duration * 1000;
      return Math.max(0, Math.floor((end - now) / 1000));
    };

    setTimeLeft(calculateTimeLeft());

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const remaining = calculateTimeLeft();
        if (remaining <= 0) {
          clearInterval(timerRef.current!);
          if (product) {
            updateProduct({ ...product, status: 'past' });
          }
          return 0;
        }
        return remaining;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [startTime, duration, productId, product, updateProduct]);

  return (
    <Typography variant="h6">
      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
    </Typography>
  );
};