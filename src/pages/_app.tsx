import React from 'react';
import '../styles/global.css';
import MainLayout from '../layouts';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <MainLayout>
      <NextNProgress height={8} color="#209cee" />
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
