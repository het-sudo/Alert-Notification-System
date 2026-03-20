import { create } from 'zustand';
import api from '@/utils/api';
import type { IUser, RegisterRequest, LoginRequest } from '@/types/api';
import { AxiosError } from 'axios';

interface AuthState {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,

  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/auth/v1/login', data);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token });
    } catch (error) {
      throw error as AxiosError;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/auth/v1/register', data);
      const { user } = response.data;
      localStorage.setItem('token', 'temp-register-token'); // Will redirect to login
      set({ user });
    } catch (error) {
      throw error as AxiosError;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  checkAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Could validate token with API
      set({ token });
    }
  },
}));


