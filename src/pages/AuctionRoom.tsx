import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuctionStore } from '../store/useAuctionStore';
import { useUser } from '../context/UserContext';
import { useAuction } from '../hooks/useAuction';
import { Navbar } from '../components/Navbar';
import { BidForm } from '../components/BidForm';
import { Box, Tabs, Tab, Typography, CardMedia, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useTimer } from '../hooks/useTimer';

export const AuctionRoom = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, bids } = useAuctionStore();
  const { user } = useUser();
  const navigate = useNavigate();
  const { joinAuction } = useAuction(Number(productId), user?.id || null);
  const product = products.find((p) => p.id === Number(productId));
  const timeLeft = useTimer(product!);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (product && user && timeLeft !== '00:00:00') {
      const joined = joinAuction();
      if (!joined) navigate('/');
    }
  }, [product, user, joinAuction, navigate, timeLeft]);

  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Box>
      <Navbar />
      <Box sx={{ display: 'flex', mt: 2 }}>
        <Box sx={{ flex: 1, p: 2 }}>
          <Typography variant="h4">{product.titulo}</Typography>
          <CardMedia component="img" height="200" image={product.imagen} alt={product.titulo} />
          <Typography>Última oferta: ${product.precio_final_ofertado || 'N/A'}</Typography>
        </Box>
        <Box sx={{ flex: 1, p: 2 }}>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            <Tab label="Información general" />
            <Tab label="Postadores" />
          </Tabs>
          {tab === 0 && (
            <Box>
              <Typography>Administrador: {product.id_administrador}</Typography>
              <Typography>Inicio: {product.fecha_hora_inicio}</Typography>
              <Typography>{product.descripcion}</Typography>
              <Typography>Tiempo restante: {timeLeft}</Typography>
              {user?.rol === 'user' && timeLeft !== '00:00:00' && <BidForm productId={product.id} />}
            </Box>
          )}
          {tab === 1 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>ID Usuario</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Fecha y Hora</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bids
                  .filter((b) => b.id_producto === product.id)
                  .sort((a, b) => b.monto_ofertado - a.monto_ofertado)
                  .map((bid, index) => (
                    <TableRow key={bid.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{bid.id_usuario}</TableCell>
                      <TableCell>{bid.id_usuario}</TableCell>
                      <TableCell>${bid.monto_ofertado}</TableCell>
                      <TableCell>{bid.fecha_hora_oferta}</TableCell>
                      <TableCell>{bid.estado}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Box>
    </Box>
  );
};