import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles.css';

import { AuthProvider } from './contexts/AuthProvider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './pages/Layout.tsx';
import { App } from './App';
import { Auth } from './pages/Auth.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
