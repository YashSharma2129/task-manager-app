import React from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ErrorAlertProps {
  error: string;
  onRetry?: () => void;
  title?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  error, 
  onRetry, 
  title = 'Error' 
}) => {
  return (
    <Alert 
      severity="error" 
      action={
        onRetry && (
          <Button 
            color="inherit" 
            size="small" 
            onClick={onRetry}
            startIcon={<Refresh />}
          >
            Retry
          </Button>
        )
      }
    >
      <AlertTitle>{title}</AlertTitle>
      {error}
    </Alert>
  );
};
