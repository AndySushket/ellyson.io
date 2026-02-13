'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent WebGPU code from running during SSG build
const FocusReactiveWebGPU = dynamic(() => import('./FocusReactiveWebGPU'), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#09010a',
      color: '#64ffda',
      fontFamily: "'Comfortaa', sans-serif",
    }}>
      Loading WebGPU...
    </div>
  )
});

export default function FocusReactiveWebGPUPage() {
  return <FocusReactiveWebGPU />;
}

