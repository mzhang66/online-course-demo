import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { 
  Container, 
  Grid, 
  Typography, 
  Paper, 
  Button, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  CircularProgress,
  Alert,
  Box,
  Divider,
  IconButton,
  Snackbar,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { api } from '../utils/api';

// Add markdown styles
const markdownStyles = {
  '& h3': {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '1.5rem',
    marginBottom: '1rem',
    color: '#1976d2'
  },
  '& p': {
    marginBottom: '1rem',
    lineHeight: 1.6
  },
  '& ul, & ol': {
    marginLeft: '1.5rem',
    marginBottom: '1rem'
  },
  '& li': {
    marginBottom: '0.5rem'
  },
  '& strong': {
    fontWeight: 'bold',
    color: '#333'
  },
  '& code': {
    backgroundColor: '#f5f5f5',
    padding: '0.2rem 0.4rem',
    borderRadius: '4px',
    fontSize: '0.875rem'
  }
};

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });
  const [problemTitles, setProblemTitles] = useState({});

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbar({
        open: true,
        message: 'Solution copied to clipboard!'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to copy solution'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, titlesRes] = await Promise.all([
          api.get(`/courses/${id}`),
          api.get('/problem-titles')
        ]);

        setCourse(courseRes.data.data);
        setProblemTitles(titlesRes.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/courses')}>
              Back to Courses
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert 
          severity="info"
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/courses')}>
              Back to Courses
            </Button>
          }
        >
          Course not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <CardContent sx={{ py: 3 }}>
          <Typography variant="h4" gutterBottom align="center">
            CCC Junior {course.year}
          </Typography>
          <Typography variant="subtitle1" align="center">
            Complete Solutions and Explanations
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {course.questions.map((question) => (
          <Grid item xs={12} key={question.number}>
            <Card sx={{ 
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom color="primary">
                  {`CCC ${course.year} J${question.number}: ${
                    problemTitles[course.year] 
                      ? problemTitles[course.year][`j${question.number}`] 
                      : question.title.split(': ')[1] || 'Problem Title'
                  }`}
                </Typography>
                <Divider sx={{ my: 3 }} />

                {/* Description Section */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Description
                    </Typography>
                  </Box>
                  <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
                    <Typography 
                      variant="body1"
                      dangerouslySetInnerHTML={{ __html: question.description }}
                    />
                  </Paper>
                </Box>

                {/* Explanation Section */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Explanation
                    </Typography>
                  </Box>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      bgcolor: 'grey.50',
                      ...markdownStyles 
                    }}
                  >
                    <ReactMarkdown>
                      {question.explanation}
                    </ReactMarkdown>
                  </Paper>
                </Box>

                {/* Solution Section */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CodeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Solution
                    </Typography>
                  </Box>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      bgcolor: '#1E1E1E',
                      position: 'relative',
                      borderRadius: 1
                    }}
                  >
                    <IconButton 
                      sx={{ 
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                      onClick={() => handleCopy(question.solution)}
                      aria-label="copy solution"
                    >
                      <ContentCopyIcon />
                    </IconButton>
                    <pre style={{ 
                      whiteSpace: 'pre-wrap', 
                      margin: 0,
                      paddingRight: '40px',
                      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      color: '#4EC9B0'
                    }}>
                      {question.solution.split('\n').map((line, i) => {
                        if (line.trim().startsWith('#')) {
                          return (
                            <span key={i} style={{ color: '#6A9955' }}>
                              {line}
                              {'\n'}
                            </span>
                          );
                        }
                        return line + '\n';
                      })}
                    </pre>
                  </Paper>
                </Box>

                {/* Tips Section */}
                {/* <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TipsAndUpdatesIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Tips
                    </Typography>
                  </Box>
                  <List sx={{ bgcolor: 'grey.50', borderRadius: 1, p: 2 }}>
                    {question.tips.map((tip, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={tip}
                          primaryTypographyProps={{
                            sx: { fontWeight: 500 }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/courses')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4
            }
          }}
        >
          Back to All Solutions
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Container>
  );
}

export default CourseDetail; 