import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Toolbar, AppBar, Typography, Box } from '@mui/material';
import { Logout } from '@mui/icons-material';

const Product = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/');
    }
  }, [router]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Welcome to the Product Dashboard
        </Typography>
        
      </Box>
    </>
  );
};

export default Product;
