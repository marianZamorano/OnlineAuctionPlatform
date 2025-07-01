export interface User {
  id: number;
  nombreDeUsuario: string;
  contrasena?: string;
  rol: 'user' | 'admin';
  avatar?: string;
  created_at: string;
}