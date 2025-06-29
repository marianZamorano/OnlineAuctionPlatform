import { useEffect, useState } from 'react';
import { Typography, Box, Tabs, Tab, Grid } from '@mui/material';
import { getProducts, Product } from '../services/productService';
import { AuctionItem } from '../components/AuctionItem';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const getStatus = (product: Product): 'active' | 'upcoming' | 'past' => {
    const start = new Date(product.startTime).getTime();
    const end = start + product.duration * 1000;
    const now = new Date().getTime();
    if (now < start) return 'upcoming';
    if (now > end) return 'past';
    return 'active';
  };

  const activeAuctions = products.filter((p) => getStatus(p) === 'active');
  const upcomingAuctions = products.filter((p) => getStatus(p) === 'upcoming');
  const pastAuctions = products.filter((p) => getStatus(p) === 'past');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Auction Platform
      </Typography>
      <Tabs value={tabValue} onChange={handleTab变更}>
        <Tab label="Active Auctions" />
        <Tab label="Upcoming Auctions" />
        <Tab label="Past Auctions" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && (
          <Grid container spacing={2}>
            {activeAuctions.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <AuctionItem product={product} status="active" />
              </Grid>
            ))}
          </Grid>
        )}
        {tabValue === 1 && (
          <Grid container spacing={2}>
            {upcomingAuctions.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <AuctionItem product={product} status="upcoming" />
              </Grid>
            ))}
          </Grid>
        )}
        {tabValue === 2 && (
          <Grid container spacing={2}>
            {pastAuctions.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <AuctionItem product={product} status="past" />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Home;