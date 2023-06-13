import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Toolbar, AppBar, Typography, Box, Modal } from '@mui/material';
import { Logout } from '@mui/icons-material';
import ProductForm from './Product.form';
import { heading } from './Product.style';

const Product = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
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

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

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
        <Box sx={heading}>
          <Typography variant="h5" component="h2" gutterBottom>
            Welcome to the Product Dashboard
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={handleModalOpen}>
        Create Product
      </Button>
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <ProductForm />
        </Box>
      </Modal>
      </Box>
    </>
  );
};

export default Product;
