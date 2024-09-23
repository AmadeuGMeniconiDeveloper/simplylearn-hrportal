import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

export function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { authToken, handleLogin } = useAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleLogin(email, password);
  }

  useEffect(() => {
    if (authToken) navigate('/');
  }, [authToken]);

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
