import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Toolbar, AppBar, Typography, Box, Modal } from '@mui/material';
import { Logout } from '@mui/icons-material';
import ProductForm from './Product.form';
import { heading } from './Product.style';
import axios from 'axios';
import { all_products_url } from '@/api';
import ProductTable from './Product.table';
import { TProductDto } from '@/common/state.interface';

const Product = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState<TProductDto[]>([]);
  const [product, setProduct] = useState<TProductDto | null>(null);
  const [call, setCall] = useState(true);
  
  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(all_products_url,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setProducts(response.data);
      setCall(false)
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }, [call]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/');
  };

  const handleModalOpen = () => {
    setOpenModal(true);
    setProduct(null)
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleDeleteProduct = (data: string) => {
    console.log(data);    
  };
  const handleUpdateProduct = (data: TProductDto) => {
    setOpenModal(true);
    setProduct(data)
  };
  const handleSelectProduct = (data: string) => {
    console.log(data);    
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
      <ProductTable 
        data={products} 
        handleDeleteProduct={handleDeleteProduct} 
        handleUpdateProduct={handleUpdateProduct} 
        handleSelectProduct={handleSelectProduct}
      />
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <ProductForm 
            productData={product} 
            setCall={setCall} 
            setOpenModal={setCall}
          />
        </Box>
      </Modal>
      </Box>
    </>
  );
};

export default Product;
