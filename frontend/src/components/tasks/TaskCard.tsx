import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  MoreVert,
  Edit,
  Delete,
  CheckCircle,
  RadioButtonUnchecked,
  Schedule,
} from '@mui/icons-material';
import type { Task } from '@/types';
import { TaskStatus } from '@/types';
import { useTaskContext } from '@/contexts/TaskContext';
import { formatDate, getTaskStatusColor, getTaskStatusLabel, isOverdue } from '@/lib/utils';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { updateTask, deleteTask, isLoading } = useTaskContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status,
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTask(task._id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleStatusChange = async (newStatus: TaskStatus) => {
    try {
      await updateTask(task._id, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await updateTask(task._id, editData);
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const isTaskOverdue = task.dueDate ? isOverdue(task.dueDate) : false;

  return (
    <>
      <Card 
        sx={{ 
          mb: 2, 
          border: isTaskOverdue ? '2px solid #f44336' : '1px solid #e0e0e0',
          opacity: task.status === TaskStatus.DONE ? 0.7 : 1,
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
              {task.title}
            </Typography>
            <IconButton onClick={handleMenuOpen} size="small">
              <MoreVert />
            </IconButton>
          </Box>

          {task.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {task.description}
            </Typography>
          )}

          <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
            <Chip
              label={getTaskStatusLabel(task.status)}
              color={getTaskStatusColor(task.status)}
              size="small"
            />
            
            {task.dueDate && (
              <Chip
                icon={<Schedule />}
                label={formatDate(task.dueDate)}
                color={isTaskOverdue ? 'error' : 'default'}
                size="small"
                variant={isTaskOverdue ? 'filled' : 'outlined'}
              />
            )}
          </Box>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            startIcon={task.status === TaskStatus.DONE ? <CheckCircle /> : <RadioButtonUnchecked />}
            onClick={() => handleStatusChange(
              task.status === TaskStatus.DONE ? TaskStatus.TODO : TaskStatus.DONE
            )}
            disabled={isLoading}
          >
            {task.status === TaskStatus.DONE ? 'Mark as Todo' : 'Mark as Done'}
          </Button>
        </CardActions>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={editData.status}
              onChange={(e) => setEditData({ ...editData, status: e.target.value as TaskStatus })}
            >
              <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
              <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
              <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isLoading}
      />
    </>
  );
};
