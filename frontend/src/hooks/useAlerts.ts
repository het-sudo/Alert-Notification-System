import { create } from 'zustand';
import api from '@/utils/api';
import type { IAlert, CreateAlertRequest, Pagination } from '@/types/api';
import { AxiosError } from 'axios';

interface AlertsState {
  alerts: IAlert[];
  pagination: Pagination | null;
  isLoading: boolean;
  getAlerts: (page?: number, limit?: number) => Promise<void>;
  createAlert: (data: CreateAlertRequest) => Promise<void>;
  toggleRead: (id: string) => Promise<void>;
  markAllRead: () => Promise<void>;
  deleteAlert: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useAlertsStore = create<AlertsState>((set, get) => ({
  alerts: [],
  pagination: null,
  isLoading: false,

  getAlerts: async (page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/alerts/v1/?page=${page}&limit=${limit}`);
      set({
        alerts: response.data.data,
        pagination: response.data.pagination,
      });
    } catch (error) {
      throw error as AxiosError;
    } finally {
      set({ isLoading: false });
    }
  },

  createAlert: async (data) => {
    const response = await api.post('/alerts/v1/', data);
    get().refresh();
    return response.data;
  },

  toggleRead: async (id) => {
    const response = await api.patch(`/alerts/v1/${id}/read`);
    get().refresh();
    return response.data;
  },

  markAllRead: async () => {
    await api.patch('/alerts/v1/read-all');
    get().refresh();
  },

  deleteAlert: async (id) => {
    await api.delete(`/alerts/v1/${id}`);
    get().refresh();
  },

  refresh: () => get().getAlerts(1, 10),
}));
