import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        backgroundColor: '#fff',
        borderTop: `1px solid ${alpha('#000', 0.1)}`,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3} alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: theme.palette.primary.main,
                color: '#fff',
              }}
            >
              <LockIcon sx={{ fontSize: 24 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: '#1a1a1a',
                fontSize: '1.5rem',
              }}
            >
              Licensing Portal
            </Typography>
          </Stack>
          
          <Stack spacing={1.5} alignItems="center" sx={{ maxWidth: 600 }}>
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: '#1a1a1a',
                fontWeight: 600,
                fontSize: '1.25rem',
              }}
            >
              Secure. Scalable. Simple.
            </Typography>

            <Typography
              variant="body1"
              align="center"
              sx={{
                color: alpha('#000', 0.7),
                fontSize: '1.1rem',
                lineHeight: 1.6,
              }}
            >
              Enterprise-grade license management platform with unmatched security and simplicity.
              Built for businesses that value reliability and performance.
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{
                color: alpha('#000', 0.6),
                fontSize: '1rem',
                mt: 1,
              }}
            >
              Trusted by companies worldwide for secure license management solutions.
            </Typography>
          </Stack>

          <Typography
            sx={{
              color: alpha('#000', 0.5),
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            © {currentYear} Licensing Portal. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer; 