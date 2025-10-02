export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  token?: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}