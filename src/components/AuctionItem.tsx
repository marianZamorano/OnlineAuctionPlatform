import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Product } from '../interfaces';
import { useTimer } from '../hooks/useTimer';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface AuctionItemProps {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const AuctionItem = ({ product, onEdit, onDelete }: AuctionItemProps) => {
  const timeLeft = useTimer(product);
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <Typography
        variant="h6"
        sx={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', p: 1 }}
      >
        {timeLeft}
      </Typography>
      <CardMedia component="img" height="140" image={product.imagen} alt={product.titulo} />
      <CardContent>
        <Typography variant="h5">{product.titulo}</Typography>
        <Typography variant="body2">{product.descripcion}</Typography>
        <Typography>Precio base: ${product.precio_base}</Typography>
        <Typography>Última oferta: ${product.precio_final_ofertado || 'N/A'}</Typography>
        {product.estado === 'activa' && user?.rol === 'user' && (
          <Button
            variant="contained"
            onClick={() => navigate(`/auction/${product.id}`)}
            disabled={timeLeft === '00:00:00'}
          >
            Yo ofertó!
          </Button>
        )}
        {product.estado === 'finalizada' && (
          <Typography color="error">Finalizado</Typography>
        )}
        {user?.rol === 'admin' && product.estado !== 'finalizada' && (
          <>
            <Button onClick={onEdit} startIcon={<EditIcon />}>Editar</Button>
            <Button onClick={onDelete} startIcon={<DeleteIcon />}>Eliminar</Button>
          </>
        )}
        <Button onClick={() => navigate(`/auction/${product.id}`)} startIcon={<VisibilityIcon />}>
          Ver
        </Button>
      </CardContent>
    </Card>
  );
};