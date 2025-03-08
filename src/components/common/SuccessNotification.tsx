import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface SuccessNotificationProps {
  open: boolean;
  title: string;
  message: string;
  loading?: boolean;
  onClose?: () => void;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  open,
  title,
  message,
  loading = false,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    navigate('/dashboard');
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 3,
          }}
        >
          {loading ? (
            <CircularProgress size={64} sx={{ mb: 2 }} />
          ) : (
            <CheckCircleIcon
              color="success"
              sx={{ fontSize: 64, mb: 2 }}
            />
          )}
          
          <Typography variant="h5" gutterBottom align="center">
            {title}
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            {message}
          </Typography>

          {!loading && (
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ minWidth: 200 }}
            >
              Return to Dashboard
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessNotification; 