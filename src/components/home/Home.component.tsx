import React from 'react';
import Box from '@mui/material/Box';
import { heading } from './Home.style';

const Home = () => {
  return (
    <div>
      <Box sx={heading}>Welcome to Next.js!</Box>
      <Box>This is the home page of my Next.js app.</Box>
    </div>
  );
};

export default Home;