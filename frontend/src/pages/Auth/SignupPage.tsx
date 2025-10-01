import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { SignupForm } from '@/components/forms/SignupForm';

export const SignupPage: React.FC = () => {
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
            Sign Up
          </Typography>
          <SignupForm />
        </Paper>
      </Box>
    </Container>
  );
};
