import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom';

export function SingIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin } = useAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <div style={{ height: '100vh', display: "flex", alignItems: "center" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: '0.75rem', height: 'fit-content', flexDirection: "column", marginInline: "auto", backgroundColor: '#FFF', boxShadow: '2px 2px 6px 0 rgba(0,0,0,0.1)', padding: "1.25rem", borderRadius: "1rem" }}>
        <h1>Login</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="email">Email</label>
          <input
            id='email'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password">Password</label>
          <input
            id='password'
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type='submit'>Sign in</button>
        <div style={{fontSize: '12px'}}>

        Or create your <Link to='/sign-up'>account</Link>
        </div>

      </form>
    </div>
  );
}
