import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Layout() {
  const { handleLogout } = useAuth();

  return (
    <div style={containerStyles}>
      <header style={headerContainerStyles}>
        <div style={headerStyles}>
          <span>HR | Portal</span>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </header>
      <main style={mainContainerStyles}>
        <Outlet />
      </main>
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // overflow: "auto",
};

const headerContainerStyles: React.CSSProperties = {
  width: "100%",
  position: "sticky",
  top: 0,
  display: "flex",
  justifyContent: "center",
  backgroundColor: "rgba(220,220,220,0.35)",
  backdropFilter: "blur(10px)",

  boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.15)",
};

const headerStyles: React.CSSProperties = {
  width: "100%",
  maxWidth: "1360px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingInline: "2rem",
  height: "3.5rem",
  fontSize: "14px",
};

const mainContainerStyles: React.CSSProperties = {
  flex: 1,
  width: "100%",
  maxWidth: "1360px",
  marginInline: "auto",
  padding: "2rem",
};
