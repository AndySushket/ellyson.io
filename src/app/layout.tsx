"use client";

import React from 'react';
import Header from 'components/ui/Header';
import { GlobalStateProvider } from 'state/GlobalStateProvider';

import "../styles/App.scss";
import Background3D from './Background3D';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const useBackGround = pathname === '/' || pathname === '/projects' || pathname === '/projects2';
  return (
    <html lang='en'>
    <head>
      <meta charSet="UTF-8" />
      <link rel="icon" href="/logo.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="ellyson.io"
      />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="Andrii Sushket" />
      <meta property="og:description" content="3D Frontend Developer" />
      <meta property="og:image" content="https://ellyson.io/logo.png" />
      <meta property="og:url" content="https://ellyson.io/" />
      <meta property="og:site_name" content="ellyson.io" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <link href="https://fonts.googleapis.com/css?family=Comfortaa" rel="stylesheet" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
        crossOrigin="anonymous"
      />
    </head>
    <body>
    {useBackGround && <Background3D/>}
    <GlobalStateProvider>
      <Header/>
      {children}
    </GlobalStateProvider>
    </body>
    </html>
  );
}
