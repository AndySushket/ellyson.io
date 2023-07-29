import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// import 'core-js';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);

registerServiceWorker();

