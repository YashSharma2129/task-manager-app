import React from 'react';
import { Box, Skeleton, Card, CardContent, CardActions } from '@mui/material';

interface SkeletonLoaderProps {
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 3 }) => {
  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
            
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
            
            <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
              <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
              <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
            </Box>
          </CardContent>
          
          <CardActions>
            <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 1 }} />
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};
