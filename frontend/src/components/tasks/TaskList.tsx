import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Chip,
  Button,
} from '@mui/material';
import { Search, Warning } from '@mui/icons-material';
import { TaskStatus } from '@/types';
import { useTaskContext } from '@/contexts/TaskContext';
import { TaskCard } from './TaskCard';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { SkeletonLoader } from '@/components/common/SkeletonLoader';
import { Pagination } from '@/components/common/Pagination';
import { isOverdue } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';

export const TaskList: React.FC = () => {
  const { 
    tasks, 
    pagination, 
    isLoading, 
    error, 
    refreshTasks, 
    loadMoreTasks,
    sortOrder,
    setSortOrder
  } = useTaskContext();
  const [statusFilter, setStatusFilter] = React.useState<TaskStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showOverdueOnly, setShowOverdueOnly] = React.useState(false);

  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesSearch = debouncedSearchQuery === '' || 
      task.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
    const matchesOverdue = !showOverdueOnly || (task.dueDate && isOverdue(task.dueDate));
    
    return matchesStatus && matchesSearch && matchesOverdue;
  });

  const groupedTasks = {
    [TaskStatus.TODO]: filteredTasks.filter(task => task.status === TaskStatus.TODO),
    [TaskStatus.IN_PROGRESS]: filteredTasks.filter(task => task.status === TaskStatus.IN_PROGRESS),
    [TaskStatus.DONE]: filteredTasks.filter(task => task.status === TaskStatus.DONE),
  };

  if (isLoading && tasks.length === 0) {
    return <SkeletonLoader count={3} />;
  }

  if (error) {
    return <ErrorAlert error={error} onRetry={refreshTasks} />;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Your Tasks
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" color="text.secondary">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </Typography>
          {searchQuery && (
            <Chip 
              label={`Search: "${searchQuery}"`} 
              size="small" 
              onDelete={() => setSearchQuery('')}
            />
          )}
          {statusFilter !== 'all' && (
            <Chip 
              label={`Status: ${statusFilter}`} 
              size="small" 
              onDelete={() => setStatusFilter('all')}
            />
          )}
          {showOverdueOnly && (
            <Chip 
              label="Overdue Only" 
              size="small" 
              color="error"
              icon={<Warning />}
              onDelete={() => setShowOverdueOnly(false)}
            />
          )}
        </Box>
      </Box>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 200 }}
        />
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
            label="Status"
          >
            <MenuItem value="all">All Tasks</MenuItem>
            <MenuItem value={TaskStatus.TODO}>To Do</MenuItem>
            <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
            <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            label="Order"
          >
            <MenuItem value="desc">Newest First</MenuItem>
            <MenuItem value="asc">Oldest First</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant={showOverdueOnly ? "contained" : "outlined"}
          color="error"
          startIcon={<Warning />}
          onClick={() => setShowOverdueOnly(!showOverdueOnly)}
          sx={{ minWidth: 140 }}
        >
          {showOverdueOnly ? 'Show All' : 'Overdue Only'}
        </Button>
      </Box>

      {filteredTasks.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            {debouncedSearchQuery || statusFilter !== 'all' || showOverdueOnly
              ? 'No tasks match your current filters' 
              : 'No tasks yet. Create your first task above to get started!'
            }
          </Typography>
        </Box>
      ) : (
        <Box>
          {Object.entries(groupedTasks).map(([status, statusTasks]) => (
            statusTasks.length > 0 && (
              <Box key={status} sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
                  {status === TaskStatus.TODO && 'To Do'}
                  {status === TaskStatus.IN_PROGRESS && 'In Progress'}
                  {status === TaskStatus.DONE && 'Done'}
                  <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({statusTasks.length})
                  </Typography>
                </Typography>
                {statusTasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </Box>
            )
          )          )}
        </Box>
      )}

      {/* Pagination */}
      <Pagination
        pagination={pagination}
        isLoading={isLoading}
        onPageChange={() => {
          // For now, just refresh with new page
          // In a real app, you'd update the query params
          refreshTasks();
        }}
        onLoadMore={loadMoreTasks}
        showLoadMore={true}
      />
    </Box>
  );
};