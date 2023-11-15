import { Book } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Book[]>(`/todos?userId=${userId}`);
};

export const API_URL = 'https://mate.academy/students-api/todos?userId=11593';
export const USER_ID = 11593;

export const addTodo = (data: Book) => {
  return client.post<Book>('/todos', data);
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId: number, data: Partial<Book>) => {
  return client.patch<Book>(`/todos/${todoId}`, data);
};

export const clearCompletedTodos = () => {
  return client.delete('/todos/completed');
};
