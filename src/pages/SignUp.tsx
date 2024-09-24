import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../api/@types';
import { useAuth } from '../contexts/AuthProvider';

export function SingUp() {
  const [email, setEmail] = useState<User["email"]>('');
  const [password, setPassword] = useState<User["password"]>('');
  const [role, setRole] = useState<User["role"]>('customer');

  const { handleRegister } = useAuth();


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    handleRegister(email, password, role)
  }

  return (
    <div style={{ height: '100vh', display: "flex", alignItems: "center" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: '0.75rem', height: 'fit-content', flexDirection: "column", marginInline: "auto", backgroundColor: '#FFF', boxShadow: '2px 2px 6px 0 rgba(0,0,0,0.1)', padding: "1.25rem", borderRadius: "1rem" }}>
        <h1>Register</h1>
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="role">Role</label>
          <select
            id='role'
            onChange={(e) => setRole(e.target.value as User["role"])}
          >
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <button type='submit'>Sign up</button>
        <div  style={{fontSize: '12px'}}>
          Got an account? <Link to='/sign-in'>Sign in</Link>
        </div>
      </form>
    </div>
  );
}
