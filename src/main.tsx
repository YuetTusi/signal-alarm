import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

const { StrictMode } = React;
const root = document.querySelector('#app') ?? document.body;

// ReactDOM.createRoot(root).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );
ReactDOM.createRoot(root).render(
  <App />,
);