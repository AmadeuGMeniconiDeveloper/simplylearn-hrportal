import { ReactNode } from "react";

interface ActionCardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function Card({ children, title, subtitle }: ActionCardProps) {
  return (
    <div style={containerStyles}>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {children && <div style={contentStyles}>{children}</div>}
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  minHeight: "9rem",
  backgroundColor: "rgba(220,220,220,0.35)",
  gap: "1.25rem",
  padding: "1rem",
  borderRadius: "5px",

  boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.15)",
};

const contentStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};
