import { useNavigate } from "react-router-dom";

export function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <div>
          <h1>401</h1>
          <p style={{ fontSize: "12px" }}>Unauthorized...</p>
        </div>
        <button type="button" onClick={() => navigate("/", { replace: true })}>
          Go home
        </button>
      </div>
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  height: "100%",
  display: "flex",
  alignItems: "center",
};

const cardStyles: React.CSSProperties = {
  display: "flex",
  width: "15rem",
  gap: "1.75rem",
  height: "fit-content",
  flexDirection: "column",
  marginInline: "auto",
  backgroundColor: "#FFF",
  boxShadow: "2px 2px 6px 0 rgba(0,0,0,0.1)",
  padding: "1.25rem",
  borderRadius: "1rem",
};
