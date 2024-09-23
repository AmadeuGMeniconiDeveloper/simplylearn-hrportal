import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';
import { useEffect } from 'react';

export function App() {

  const { authToken } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  }, [authToken]);

  return <Outlet />

}
