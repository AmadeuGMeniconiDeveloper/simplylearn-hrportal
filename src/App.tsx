import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';
import { useEffect } from 'react';

export function App() {

  // const { loggedUser } = useAuth();

  // const navigate = useNavigate();


  // useEffect(() => {
  //   if (loggedUser) {
  //     navigate('/');
  //   } else {
  //     navigate('/sign-in');
  //   }
  // }, [loggedUser]);

  return <Outlet />

}
