import React from 'react';
import Box from '@mui/material/Box';
import { heading } from './Home.style';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const redirectToProductPage = () => {
    router.push('/product');
  };

  return (
    <div>
      <Box sx={heading}>Welcome to Next.js!</Box>
      <Box>This is the home page of my Next.js app.</Box>
      <Box component='button' onClick={redirectToProductPage}>Product</Box>
    </div>
  );
};

export default Home;