import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { Button, Container } from "react-bootstrap";

export function Layout() {
  const { onLogout } = useAuth();

  return (
    <div style={containerStyles}>
      <header style={headerContainerStyles}>
        <div style={headerStyles}>
          <span style={{ fontSize: "1rem" }}>HR | Portal</span>
          <Button variant="outline-dark" size="sm" onClick={onLogout}>
            Log out
          </Button>
        </div>
      </header>
      <Container style={{ marginBlock: "3.5rem" }}>
        <Outlet />
      </Container>
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
};

const headerContainerStyles: React.CSSProperties = {
  width: "100%",
  position: "sticky",
  top: 0,
  zIndex: 1,
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
