import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useTaskContext } from '@/contexts/TaskContext';
import { createTaskSchema, type CreateTaskFormData } from '@/lib/validation';
import { TaskStatus } from '@/types';

interface TaskFormProps {
  onTaskCreated?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const { createTask, isCreating } = useTaskContext();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      status: TaskStatus.TODO,
    },
  });

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      setError(null);
      // Clean up empty strings to undefined
      const cleanedData = {
        ...data,
        description: data.description === '' ? undefined : data.description,
        dueDate: data.dueDate === '' ? undefined : data.dueDate,
      };
      await createTask(cleanedData);
      reset();
      onTaskCreated?.(); // Call the callback to close the form
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Task Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{ flex: 1, minWidth: 200 }}
        />
        
        <FormControl sx={{ minWidth: 150 }} error={!!errors.status}>
          <InputLabel>Status</InputLabel>
          <Select
            {...register('status')}
            defaultValue={TaskStatus.TODO}
            label="Status"
          >
            <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
            <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
            <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
          </Select>
          {errors.status && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
              {errors.status.message}
            </Typography>
          )}
        </FormControl>
      </Box>
      
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
        sx={{ mb: 2 }}
      />
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          type="datetime-local"
          label="Due Date"
          InputLabelProps={{ shrink: true }}
          {...register('dueDate')}
          error={!!errors.dueDate}
          helperText={errors.dueDate?.message}
          sx={{ minWidth: 200 }}
        />
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting || isCreating}
      >
        {(isSubmitting || isCreating) ? (
          <CircularProgress size={24} />
        ) : (
          'Create Task'
        )}
      </Button>
    </Box>
  );
};