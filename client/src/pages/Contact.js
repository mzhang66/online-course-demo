import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Contact() {
  return (
    <Container sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1">
        For any inquiries, please reach out to us at:
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" color="primary">
          info@xxx.com
        </Typography>
      </Box>
    </Container>
  );
}

export default Contact; 