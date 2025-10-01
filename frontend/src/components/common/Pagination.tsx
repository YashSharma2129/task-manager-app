import React from 'react';
import {
  Box,
  Button,
  Typography,
  Pagination as MuiPagination,
  CircularProgress,
} from '@mui/material';
import type { PaginationInfo } from '@/types';

interface PaginationProps {
  pagination: PaginationInfo | null;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onLoadMore?: () => void;
  showLoadMore?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  isLoading,
  onPageChange,
  onLoadMore,
  showLoadMore = false,
}) => {
  if (!pagination) return null;

  const { page, totalPages, total, hasNext } = pagination;

  if (showLoadMore) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        {hasNext ? (
          <Button
            variant="outlined"
            onClick={onLoadMore}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
          >
            {isLoading ? 'Loading...' : 'Load More Tasks'}
          </Button>
        ) : (
          <Typography variant="body2" color="text.secondary">
            All tasks loaded ({total} total)
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        Page {page} of {totalPages} ({total} total tasks)
      </Typography>
      
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={(_, newPage) => onPageChange(newPage)}
        disabled={isLoading}
        color="primary"
        size="large"
      />
    </Box>
  );
};
