export interface IUser {
  _id?: string;
  name: string;
  email: string;
}

export interface IAlert {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  isRead: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
}

export interface ApiResponse<T = {}> {
  success: boolean;
  data?: T;
  pagination?: Pagination;
  message?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateAlertRequest {
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error';
}
