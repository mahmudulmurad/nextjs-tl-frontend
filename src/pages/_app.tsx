import React from 'react';
import '../styles/global.css';
import MainLayout from '../layouts';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <MainLayout>
      <NextNProgress />
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
