import { useEffect, useState } from 'react';
import { useAuctionStore } from '../store/useAuctionStore';
import { getProductsBySection } from '../services/auctionService';
import { AuctionItem } from '../components/AuctionItem';
import { Navbar } from '../components/Navbar';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const Home = () => {
  const { fetchInitialData, products } = useAuctionStore();
  const [sections, setSections] = useState({ current: [], upcoming: [], past: [] });
  const [carouselIndices, setCarouselIndices] = useState({ current: 0, upcoming: 0, past: 0 });

  useEffect(() => {
    fetchInitialData();
    getProductsBySection().then(setSections);
  }, [fetchInitialData]);

  const handleNext = (section: 'current' | 'upcoming' | 'past') => {
    setCarouselIndices((prev) => ({
      ...prev,
      [section]: prev[section] + 5 < sections[section].length ? prev[section] + 5 : 0,
    }));
  };

  const handlePrev = (section: 'current' | 'upcoming' | 'past') => {
    setCarouselIndices((prev) => ({
      ...prev,
      [section]: prev[section] - 5 >= 0 ? prev[section] - 5 : Math.max(0, sections[section].length - 5),
    }));
  };

  const renderCarousel = (section: 'current' | 'upcoming' | 'past', title: string) => (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5">{title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => handlePrev(section)} disabled={carouselIndices[section] === 0}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
          {sections[section]
            .slice(carouselIndices[section], carouselIndices[section] + 5)
            .map((product) => (
              <AuctionItem key={product.id} product={product} />
            ))}
        </Box>
        <IconButton
          onClick={() => handleNext(section)}
          disabled={carouselIndices[section] + 5 >= sections[section].length}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Navbar />
      {renderCarousel('current', 'Subastas Actuales')}
      {renderCarousel('upcoming', 'Subastas Próximas')}
      {renderCarousel('past', 'Subastas Pasadas')}
    </Box>
  );
};