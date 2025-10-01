import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { taskService } from '@/api/taskService';
import type { Task, CreateTaskData, UpdateTaskData, PaginationInfo } from '@/types';

type SortOrder = 'asc' | 'desc';

interface TaskContextType {
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

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const fetchTasks = useCallback(async (page = 1, append = false) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await taskService.getTasks(page, 10, sortOrder);
      
      if (append) {
        setTasks(prev => [...prev, ...response.data]);
      } else {
        setTasks(response.data);
      }
      setPagination(response.pagination);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  }, [sortOrder]);

  const createTask = useCallback(async (data: CreateTaskData) => {
    try {
      setIsCreating(true);
      setError(null);
      const newTask = await taskService.createTask(data);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, []);

  const updateTask = useCallback(async (id: string, data: UpdateTaskData) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedTask = await taskService.updateTask(id, data);
      setTasks(prev => prev.map(task => task._id === id ? updatedTask : task));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshTasks = useCallback(() => {
    return fetchTasks(1, false);
  }, [fetchTasks]);

  const loadMoreTasks = useCallback(async () => {
    if (pagination && pagination.hasNext) {
      return fetchTasks(currentPage + 1, true);
    }
  }, [fetchTasks, pagination, currentPage]);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks(1, false);
  }, [fetchTasks]);

  const value: TaskContextType = {
    tasks,
    pagination,
    isLoading,
    isCreating,
    error,
    sortOrder,
    setSortOrder,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks,
    loadMoreTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
