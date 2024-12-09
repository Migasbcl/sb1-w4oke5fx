export interface User {
  id: string;
  email: string;
  name: string;
  role: 'organizer' | 'promoter';
  teamId?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: 'organizer' | 'promoter';
}