import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to Crash Course for Canada Computing Competition(CCC) Junior (held by University of Waterloo )
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom color="textSecondary">
            This course is designed to help you rapidly improve your skills in tackling mid-to-hard questions on the CCC. 
            It offers Python-based code solutions for Questions 3 and 4 from all CCC Junior contests between 2015 and 2024. 
            In addition, the course provides key strategies for approaching these problems, 
            along with a comprehensive cheat sheet that covers all the essential coding concepts needed to solve problems 1 to 4. 
            Best of luck in your upcoming CCC Junior Contest!
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/courses')}
              sx={{ mt: 2 }}
            >
              Start
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home; 