import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  CircularProgress,
  Alert,
  Box,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

function Courses() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState([]);
  const [problemTitles, setProblemTitles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, titlesRes] = await Promise.all([
          api.get('/courses'),
          api.get('/problem-titles')
        ]);

        setCourses(coursesRes.data.courses);
        setProblemTitles(titlesRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewSolutions = (course) => {
    if (!isAuthenticated && course.year !== 2024) {
      navigate('/signin');
    } else {
      navigate(`/courses/${course._id}`);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const getQuestionTitle = (year, questionNumber) => {
    if (problemTitles[year] && problemTitles[year][`j${questionNumber}`]) {
      return `J${questionNumber}: ${problemTitles[year][`j${questionNumber}`]}`;
    }
    return `J${questionNumber}: Problem Title`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        CCC Junior Solutions (2015-2024)
      </Typography>

      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item xs={12} key={course._id}>
            <Card 
              sx={{ 
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s',
                opacity: (!isAuthenticated && course.year !== 2024) ? 0.7 : 1
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom color="primary">
                  CCC Junior {course.year}
                  {course.year === 2024 && !isAuthenticated && (
                    <Typography 
                      component="span" 
                      color="success.main" 
                      sx={{ ml: 2, fontSize: '0.8em' }}
                    >
                      (Free Preview)
                    </Typography>
                  )}
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 3 }}>
                  {course.questions.map((question) => (
                    <Box 
                      key={question.number}
                      sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50', 
                        borderRadius: 1,
                        mb: 2,
                        '&:last-child': {
                          mb: 0
                        }
                      }}
                    >
                      <Typography variant="subtitle1">
                        {getQuestionTitle(course.year, question.number)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => handleViewSolutions(course)}
                  disabled={!isAuthenticated && course.year !== 2024}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: 2,
                    '&:hover': {
                      boxShadow: 4
                    }
                  }}
                >
                  {!isAuthenticated && course.year !== 2024 ? 'Sign In to View' : 'View Solutions'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Courses; 