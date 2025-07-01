import { Product, Bid } from '../interfaces';
import { fetchProducts, placeBid, updateProduct, fetchBids } from '../api/auctionsApi';
import { useAuctionStore } from '../store/useAuctionStore';

export const getProductsBySection = async (): Promise<{
  current: Product[];
  upcoming: Product[];
  past: Product[];
}> => {
  const products = await fetchProducts();
  return {
    current: products.filter((p) => p.seccion === 'Subastas Actuales').sort((a, b) => new Date(b.fecha_hora_final).getTime() - new Date(a.fecha_hora_final).getTime()),
    upcoming: products.filter((p) => p.seccion === 'Subastas Próximas').sort((a, b) => new Date(a.fecha_hora_inicio).getTime() - new Date(b.fecha_hora_inicio).getTime()),
    past: products.filter((p) => p.seccion === 'Subastas Pasadas').sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
  };
};

export const validateBid = async (product: Product, bidAmount: number, userId: number): Promise<{ valid: boolean; message?: string }> => {
  const bids = await fetchBids(product.id);
  if (bids.some((bid) => bid.monto_ofertado === bidAmount)) {
    return { valid: false, message: 'Bid amount must be unique' };
  }
  if (bidAmount < product.precio_base || (product.precio_final_ofertado && bidAmount <= product.precio_final_ofertado)) {
    return { valid: false, message: 'Bid must be higher than current or base price' };
  }
  return { valid: true };
};

export const submitBid = async (productId: number, userId: number, amount: number, adminId: number): Promise<Bid> => {
  const bid = await placeBid({
    id_producto: productId,
    id_administrador: adminId,
    id_usuario: userId,
    monto_ofertado: amount,
    fecha_hora_oferta: new Date().toISOString(),
    estado: 'attempt',
  });
  await updateProduct(productId, { precio_final_ofertado: amount, id_usuario: userId });
  return bid;
};

export const updateAuctionStatus = async (product: Product): Promise<void> => {
  const now = new Date();
  const start = new Date(product.fecha_hora_inicio);
  const end = new Date(product.fecha_hora_final);
  let update: Partial<Product> = {};
  if (now >= start && now < end && product.estado !== 'activa') {
    update = { estado: 'activa', seccion: 'Subastas Actuales' };
  } else if (now >= end && product.estado !== 'finalizada') {
    update = { estado: 'finalizada', seccion: 'Subastas Pasadas' };
    const bids = await fetchBids(product.id);
    const winningBid = bids.sort((a, b) => b.monto_ofertado - a.monto_ofertado)[0];
    if (winningBid) {
      await placeBid({ ...winningBid, estado: 'winner' });
    }
  }
  if (Object.keys(update).length) {
    await updateProduct(product.id, update);
  }
};