import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Toolbar, AppBar, Typography, Box, Modal, Snackbar, Alert } from '@mui/material';
import { Logout } from '@mui/icons-material';
import ProductCreateForm from './ProductCreate.form';
import { heading } from './Product.style';
import axios from 'axios';
import { all_products_url, product_batch_delete, product_delete } from '@/api';
import ProductTable from './Product.table';
import { Message, ModalStatus, TProductDto } from '@/common/state.interface';
import ProductUpdateForm from './ProductUpdate.form';

const Product = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<ModalStatus>({create: false, update: false});
  const [products, setProducts] = useState<TProductDto[]>([]);
  const [product, setProduct] = useState<TProductDto | null>(null);
  const [call, setCall] = useState(true);
  const [message, setMessage] = useState<Message>({ error: '', success: '' });

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
      setMessage(() => ({ error: '', success: 'all products' }));
    } catch (error: any) {
      if (error?.response) {
        if(error?.response?.status === 404){
          setProducts([])
          setCall(false)
        }
        setMessage((prevMessage) => ({ ...prevMessage, error: error.response?.data?.message }));
      } else {
        setMessage((prevMessage) => ({ ...prevMessage, error: `Something went wrong` }));
      }
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts,call]);

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
    setOpenModal((prev)=>({...prev, create:true}));
    setProduct(null)
  };

  const handleModalClose = () => {
    setOpenModal(()=>({create:false, update: false}));
  };

  const handleDeleteProduct = async (id: string) => {
    try{
    const token = localStorage.getItem('accessToken');
    const response = await axios.delete(product_delete(id),{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   if(response?.status === 200){
    setMessage((prevMessage) => ({ ...prevMessage, success: response?.data }));
    setCall(true)
   }
  }
   catch (error: any) {
    if (error?.response) {
      setMessage((prevMessage) => ({ ...prevMessage, error: error.response?.data?.message }));
    } else {
      setMessage((prevMessage) => ({ ...prevMessage, error: `Something went wrong` }));
    }
  }
  };
  const handleUpdateProduct = (data: TProductDto) => {
    setOpenModal((prev)=>({...prev, update:true}));
    setProduct(data)
  };

  const handleSelectProduct = async(data: string[]) => {
    try{
      const payload = {ids: data}
      const token = localStorage.getItem('accessToken');
      const response = await axios.delete(product_batch_delete, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload
      });
     if(response?.status === 200){
      setMessage((prevMessage) => ({ ...prevMessage, success: response?.data }));
      setCall(true)
     }
    }
     catch (error: any) {
      if (error?.response) {
        setMessage((prevMessage) => ({ ...prevMessage, error: error.response?.data?.message }));
      } else {
        setMessage((prevMessage) => ({ ...prevMessage, error: `Something went wrong` }));
      }
    }
  };

  const handleSnackbarClose = () => {
    setMessage((prevMessage) => ({ ...prevMessage, success: '' }));
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
      {message.error && (
        <Typography sx={{mt: '10px'}}  variant="body2" color="error" component="p">
          {message.error}
        </Typography>
      )}

      <Snackbar open={!!message.success} autoHideDuration={3000} onClose={handleSnackbarClose} message={message.success}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {message.success}
          </Alert>
      </Snackbar>
      <Modal open={openModal.create} onClose={handleModalClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <ProductCreateForm
            setCall={setCall} 
            setOpenModal={setOpenModal}
          />
        </Box>
      </Modal>
      <Modal open={openModal.update} onClose={handleModalClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <ProductUpdateForm 
            productData={product} 
            setCall={setCall} 
            setOpenModal={setOpenModal}
          />
        </Box>
      </Modal>
      </Box>
    </>
  );
};

export default Product;
