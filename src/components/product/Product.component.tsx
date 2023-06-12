import React from 'react';
import Box from '@mui/material/Box';
import { heading } from './Product.style';

const Product = () => {
  return (
    <div>
      <Box sx={heading}>Welcome to Next.js!</Box>
      <Box>This is the Product page of my Next.js app.</Box>
    </div>
  );
};

export default Product;