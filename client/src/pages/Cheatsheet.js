import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../config';

function Cheatsheet() {
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheatsheet = async () => {
      try {
        console.log("getting url...")
        const response = await axios.get(API_URL + '/cheatsheet', 
          { responseType: 'blob',
            headers: {
              'X-API-Key': process.env.REACT_APP_API_KEY
            }
           });
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        console.log("getting url:" + url)
        setPdfUrl(url);
      } catch (error) {
        console.error('Error fetching cheatsheet:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCheatsheet();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Loading cheatsheet...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Cheatsheet
      </Typography>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height={`${window.innerHeight - 200}px`}
          title="Cheatsheet PDF"
        />
      ) : (
        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
            Cheatsheet not found.
          </Typography>
        </Paper>
      )}
    </Container>
  );
}

export default Cheatsheet; 