'use client';
import dynamic from 'next/dynamic';
// Use dynamic import with ssr: false to prevent Three.js code from running during SSG build
const FocusReactive = dynamic(() => import('./FocusReactive'), { 
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
      Loading...
    </div>
  )
});
export default function FocusReactivePage() {
  return <FocusReactive />;
}
