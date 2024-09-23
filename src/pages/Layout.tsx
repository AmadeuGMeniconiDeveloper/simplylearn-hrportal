import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

export function Layout() {
  const { handleLogout } = useAuth();

  return (
    <div style={containerStyles}>
      <header style={headerContainerStyles}>
        <div style={headerStyles}>
          <span>HR | App</span>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </header>
      <main style={mainContainerStyles}>
      <Outlet  />
      </main>
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
};

const headerContainerStyles: React.CSSProperties = {
  width: '100%',
  position: 'sticky',
  top: 0,
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'rgba(220,220,220,0.35)',
  backdropFilter: 'blur(10px)',

  boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.15)',
};

const headerStyles: React.CSSProperties = {
  height: '3rem',
  width: '100%',
  maxWidth: '1024px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingInline: '2rem',
  fontSize: '14px',
};

const mainContainerStyles: React.CSSProperties = {
  width: '100%',
  maxWidth: '1024px',
  marginTop: '2rem',
  marginInline: 'auto',
  paddingInline: '2rem',
};
