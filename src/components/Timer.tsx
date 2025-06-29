import { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';

interface TimerProps {
  startTime: string;
  duration: number;
  productId: string;
  onEnd: () => void;
}

export const Timer: React.FC<TimerProps> = ({ startTime, duration, productId, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = new Date(startTime).getTime();
      const now = new Date().getTime();
      const end = start + duration * 1000;
      return Math.max(0, Math.floor((end - now) / 1000));
    };

    setTimeLeft(calculateTimeLeft());

    timerRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      if (calculateTimeLeft() <= 0) {
        clearInterval(timerRef.current!);
        onEnd();
      }
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [startTime, duration, productId, onEnd]);

  return (
    <Typography variant="h6">
      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
    </Typography>
  );
};