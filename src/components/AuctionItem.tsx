import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Timer } from './Timer';
import { BidForm } from './BidForm';
import type { Product } from '../services/productService';

interface AuctionItemProps {
  product: Product;
  status: 'active' | 'upcoming' | 'past';
  onTimerEnd: () => void;
}

export const AuctionItem: React.FC<AuctionItemProps> = ({ product, status, onTimerEnd }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia component="img" height="140" image={product.image} alt={product.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
          Base Price: ${product.basePrice}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Current Price: ${product.currentPrice}
        </Typography>
        {status === 'active' && (
          <Box sx={{ mt: 2 }}>
            <Timer startTime={product.startTime} duration={product.duration} productId={product.id} onEnd={onTimerEnd} />
            <BidForm product={product} />
          </Box>
        )}
        {status === 'past' && product.lastBidder && (
          <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
            Winner: {product.lastBidder} with ${product.currentPrice}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </Typography>
      </CardContent>
    </Card>
  );
};