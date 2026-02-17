export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export type AuthResponse = LoginResponse;

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
