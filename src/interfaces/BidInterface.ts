export interface Bid {
  id: number;
  id_producto: number;
  id_administrador: number;
  id_usuario: number;
  monto_ofertado: number;
  fecha_hora_oferta: string;
  estado: 'attempt' | 'rejected' | 'winner';
  created_at: string;
}