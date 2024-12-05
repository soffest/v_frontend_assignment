import { API_BASE } from "../../app/constants";

export interface User {
  id: number,
  name: string,
  email: string,
  age: number,
}

export type UsersSearchResults = User[];

export interface UsersSearchQuery {
  filter?: { 
    name: string
  },
  page?: number,
  pageSize?: number
}

// API

export const GET_USERS = `${API_BASE}/users`;
export const SEARCH_USERS = `${API_BASE}/users/search`;
export const GET_USER = (id: User['id']) => `${API_BASE}/users/${id}`;

// Helpers

export const getQueryKey = (query: UsersSearchQuery | undefined) => query ? JSON.stringify(query) : '';


// Constants

export const PAGE_SIZE = 30;