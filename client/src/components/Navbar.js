import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Crash Course for the CCC Junior
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/" 
              sx={{ border: isActive('/') ? '2px solid white' : 'none' }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/courses" 
              sx={{ border: isActive('/courses') ? '2px solid white' : 'none' }}
            >
              Solution Kit
            </Button>
            {isAuthenticated ? (
              <>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/cheatsheet"
                  sx={{ border: isActive('/cheatsheet') ? '2px solid white' : 'none' }}
                >
                  Cheatsheet
                </Button>
                <Button 
                  color="inherit"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/signin"
                  sx={{ border: isActive('/signin') ? '2px solid white' : 'none' }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  component={RouterLink} 
                  to="/signup"
                  sx={{ border: isActive('/signup') ? '2px solid white' : 'none' }}
                >
                  Sign Up
                </Button>
              </>
            )}
            <Box sx={{ borderLeft: 1, height: 24, mx: 1, borderColor: 'white' }} /> {/* Divider */}
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/contact"
              sx={{ border: isActive('/contact') ? '2px solid white' : 'none' }}
            >
              Contact
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 