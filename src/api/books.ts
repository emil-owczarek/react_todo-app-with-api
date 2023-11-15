import { Book } from '../types/Book';
import { client } from '../utils/fetchClient';

export const getBooks = (userId: number) => {
  return client.get<Book[]>(`/todos?userId=${userId}`);
};

export const API_URL = 'https://mate.academy/students-api/todos?userId=11593';
export const USER_ID = 11593;

export const addBook = (data: Book) => {
  return client.post<Book>('/todos', data);
};

export const deleteBook = (bookId: number) => {
  return client.delete(`/todos/${bookId}`);
};

export const updateBook = (bookId: number, data: Partial<Book>) => {
  return client.patch<Book>(`/todos/${bookId}`, data);
};

export const clearCompletedBooks = () => {
  return client.delete('/todos/completed');
};
