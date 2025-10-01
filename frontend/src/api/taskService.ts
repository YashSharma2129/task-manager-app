import { apiClient } from './apiClient';
import type { Task, CreateTaskData, UpdateTaskData, PaginatedResponse } from '@/types';

export const taskService = {
  async getTasks(page = 1, limit = 10, sortOrder = 'desc'): Promise<PaginatedResponse<Task>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortOrder,
    });
    const response = await apiClient.get<PaginatedResponse<Task>>(`/tasks?${params}`);
    return response;
  },


  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await apiClient.post<Task>('/tasks', data);
    return response;
  },

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    const response = await apiClient.patch<Task>(`/tasks/${id}`, data);
    return response;
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },
};
