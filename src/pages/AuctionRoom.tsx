import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { getProducts } from '../services/productService';
import { AuctionItem } from '../components/AuctionItem';
import type { Product } from '../services/productService';

const AuctionRoom: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const foundProduct = products.find((p) => p.id === productId);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const getStatus = (product: Product): 'active' | 'upcoming' | 'past' => {
    const start = new Date(product.startTime).getTime();
    const end = start + product.duration * 1000;
    const now = new Date().getTime();
    if (now < start) return 'upcoming';
    if (now > end) return 'past';
    return 'active';
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Auction: {product.title}
      </Typography>
      <AuctionItem
        product={product}
        status={getStatus(product)}
        onTimerEnd={() => console.log(`Subasta para ${product.id} finalizada`)}
      />
    </Box>
  );
};

export default AuctionRoom;