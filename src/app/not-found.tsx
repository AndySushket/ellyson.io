'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        color: '#ebebeb',
        fontFamily: "'Comfortaa', sans-serif",
        background: '#09010a',
      }}
    >
      <h1 style={{ fontSize: '6rem', marginBottom: '1rem', color: '#64ffda' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page not found</p>
      <Link
        href="/"
        style={{
          padding: '12px 24px',
          background: 'rgba(100, 255, 218, 0.1)',
          border: '1px solid #64ffda',
          borderRadius: '4px',
          color: '#64ffda',
          textDecoration: 'none',
          transition: 'background 0.3s ease',
        }}
      >
        Go back home
      </Link>
    </div>
  );
}

