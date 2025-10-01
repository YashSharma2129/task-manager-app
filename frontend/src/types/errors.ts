export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface TaskError extends ApiError {
  taskId?: string;
}

export interface UserError extends ApiError {
  userId?: string;
}

export class TaskNotFoundException extends Error {
  constructor(taskId: string) {
    super(`Task with ID ${taskId} not found`);
    this.name = 'TaskNotFoundException';
  }
}

export class UserNotFoundException extends Error {
  constructor(userId: string) {
    super(`User with ID ${userId} not found`);
    this.name = 'UserNotFoundException';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
