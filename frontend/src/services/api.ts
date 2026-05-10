import axios from 'axios';
import type { Book, CreateBookDto, UpdateBookDto } from '../types/book';

const API_URL = 'http://localhost:5071/api/books';

axios.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem('library_auth_user');
    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore parse errors
  }
  return config;
});

export const getBooks = async (): Promise<Book[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getBook = async (id: number): Promise<Book> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createBook = async (data: CreateBookDto): Promise<Book> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateBook = async (id: number, data: UpdateBookDto): Promise<Book> => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
