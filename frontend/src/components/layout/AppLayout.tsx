import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container, IconButton, Tooltip } from '@mui/material';
import { Logout, LightMode, DarkMode } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/theme/useTheme';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useTheme();

  const getThemeIcon = () => {
    return mode === 'light' ? <DarkMode /> : <LightMode />;
  };

  const getThemeTooltip = () => {
    return mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          {user && (
            <>
              <Typography variant="body2" sx={{ mr: 2 }}>
                Welcome, {user.username}
              </Typography>
              
              <Tooltip title={getThemeTooltip()}>
                <IconButton 
                  color="inherit" 
                  onClick={toggleMode}
                  sx={{ mr: 1 }}
                >
                  {getThemeIcon()}
                </IconButton>
              </Tooltip>
              
              <Button 
                color="inherit" 
                onClick={logout}
                startIcon={<Logout />}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};
