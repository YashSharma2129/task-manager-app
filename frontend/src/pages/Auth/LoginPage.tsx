import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { LoginForm } from '@/components/forms/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
};
