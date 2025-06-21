import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bottom: 0,
        width: '100%',
        backgroundColor: '#1976d2',
        color: 'white',
        py: 2,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2">
          © {new Date().getFullYear()} Shopping Paradise. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
