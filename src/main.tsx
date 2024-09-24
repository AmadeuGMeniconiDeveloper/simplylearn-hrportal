import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles.css';

import { AuthProvider } from './contexts/AuthProvider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './pages/Layout.tsx';
import { App } from './App';
import { SingIn } from './pages/SignIn.tsx';
import { SingUp } from './pages/SignUp.tsx';
import { AdminHome } from './pages/AdminHome.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';
import { Home } from './pages/Home.tsx';

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <App />,
  //   children: [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'admin',
        element:
          <ProtectedRoute roles={['admin']}>
            <AdminHome />
          </ProtectedRoute>,
      },
      {
        path: 'home',
        element:
          <ProtectedRoute roles={['admin']}>
            <Home />
          </ProtectedRoute>,
      },
    ],
  },
  {
    path: 'sign-in',
    element: <SingIn />,
  },
  {
    path: 'sign-up',
    element: <SingUp />,
  },
  // ]
  // },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
