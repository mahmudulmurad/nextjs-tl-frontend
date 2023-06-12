import React from 'react';
import { main } from './style';
import Box  from '@mui/material/Box';

const MainLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
      <Box sx={main}>{children}</Box>
  );
};

export default MainLayout;