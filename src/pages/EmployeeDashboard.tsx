import { Card } from "../components/ActionCard";
import { useAuth } from "../hooks/useAuth";

export function EmployeeDashboard() {
  const { loggedUser } = useAuth();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Employee Dashboard</h1>

      {loggedUser && (
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "start",
            marginTop: "1.5rem",
          }}
        >
          <Card title="Welcome" subtitle={`${loggedUser.email}`}>
            <button type="submit">View profile</button>
          </Card>
          <Card title="Leave details" subtitle="View your leave details">
            <button type="submit">View details</button>
          </Card>
          <Card
            title="Apply for leave"
            subtitle="Describe your reason for leave"
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <textarea
                cols={30}
                rows={10}
                style={{
                  resize: "vertical",
                  maxHeight: "600px",
                  minHeight: "100px",
                }}
              />
              <button type="submit">Submit leave</button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
