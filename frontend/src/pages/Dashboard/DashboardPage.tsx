import React, { useState } from 'react';
import { Box, Typography, Divider, Button, Collapse } from '@mui/material';
import { Add, ExpandLess } from '@mui/icons-material';
import { TaskForm } from '@/components/forms/TaskForm';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskProvider } from '@/contexts/TaskContext';

export const DashboardPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormToggle = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <TaskProvider>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage your tasks efficiently. Create, update, and track your progress with ease.
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Collapsible Task Creation Form */}
        <Box mb={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" component="h2">
              Task Management
            </Typography>
            <Button
              variant="contained"
              startIcon={isFormOpen ? <ExpandLess /> : <Add />}
              onClick={handleFormToggle}
              sx={{ minWidth: 140 }}
            >
              {isFormOpen ? 'Hide Form' : 'Add Task'}
            </Button>
          </Box>
          
          <Collapse in={isFormOpen}>
            <Box sx={{ 
              border: '1px solid', 
              borderColor: 'divider', 
              borderRadius: 2, 
              p: 3,
              backgroundColor: 'background.paper'
            }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Create New Task
              </Typography>
              <TaskForm onTaskCreated={() => setIsFormOpen(false)} />
            </Box>
          </Collapse>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <TaskList />
      </Box>
    </TaskProvider>
  );
};
