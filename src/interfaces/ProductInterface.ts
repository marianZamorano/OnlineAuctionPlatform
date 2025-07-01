export interface Product {
  id: number;
  id_administrador: number;
  imagen: string;
  titulo: string;
  descripcion: string;
  precio_base: number;
  precio_final_ofertado: number | null;
  id_usuario: number | null;
  duracion: number;
  fecha_hora_inicio: string;
  fecha_hora_final: string;
  estado: 'activa' | 'proxima' | 'finalizada';
  seccion: 'Subastas Actuales' | 'Subastas Próximas' | 'Subastas Pasadas';
  created_at: string;
}