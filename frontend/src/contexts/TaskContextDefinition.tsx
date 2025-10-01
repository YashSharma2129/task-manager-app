import { createContext } from 'react';
import type { Task, CreateTaskData, UpdateTaskData, PaginationInfo } from '@/types';

type SortOrder = 'asc' | 'desc';

export interface TaskContextType {
  tasks: Task[];
  pagination: PaginationInfo | null;
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
  createTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (id: string, data: UpdateTaskData) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
  loadMoreTasks: () => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);
