import { Button, Card, Form, Modal, Spinner, Toast } from "react-bootstrap";
import { useState } from "react";
import { LeaveStatusModal } from "../components/LeaveStatusModal";
import { useEmployee } from "../hooks/useEmployee";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import { EmployeeDetailsModal } from "../components/EmployeeDetailsModal";

export function EmployeeDashboard() {
  const [leaveReason, setLeaveReason] = useState<string>("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { loggedUser } = useAuth();
  const { leave, onCreateLeave, isLoading } = useEmployee();

  async function handleSubmitLeave(e: React.FormEvent) {
    e.preventDefault();

    if (!loggedUser) {
      return;
    }

    const { code, body } = await onCreateLeave(loggedUser, leaveReason);

    if (code === "OK") {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      ));

      setLeaveReason("");
    } else {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      ));
    }
  }

  return (
    <div style={containerStyles}>
      <h1>Employee Dashboard</h1>

      {loggedUser && (
        <div style={gridContainerStyles}>
          <Card>
            <Card.Body style={cardBodyStyles}>
              <div>
                <Card.Title>Welcome {loggedUser.name}</Card.Title>
                <Card.Text style={{ fontSize: "14px" }}>
                  You are logged in as {loggedUser.email}
                </Card.Text>
              </div>

              <Button
                variant="dark"
                style={{ alignSelf: "flex-end" }}
                onClick={() => setShowDetailsModal(true)}
              >
                View details
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body style={cardBodyStyles}>
              <div>
                <Card.Title>View Leave Status</Card.Title>
                <Card.Text style={{ fontSize: "14px" }}>
                  Here you can check your leave status
                </Card.Text>
              </div>
              <Button
                variant="dark"
                style={{ alignSelf: "flex-end" }}
                onClick={() => setShowLeaveModal(true)}
              >
                View status
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ gridColumn: "span 2" }}>
            <Card.Body style={cardBodyStyles}>
              <div style={{ marginBottom: "1rem" }}>
                <Card.Title>Apply for Leave</Card.Title>
                <Card.Text style={{ fontSize: "14px" }}>
                  Fill reasons for leave
                </Card.Text>
              </div>

              <Form id="add-employee-form" onSubmit={handleSubmitLeave}>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    required
                    style={formTextAreaStyles}
                    minLength={20}
                    disabled={leave?.status === "pending"}
                    onChange={e => setLeaveReason(e.target.value)}
                    value={leaveReason}
                  />
                </Form.Group>
              </Form>

              <Button
                variant="dark"
                type="submit"
                form="add-employee-form"
                disabled={leave?.status === "pending"}
                style={{ alignSelf: "flex-end", minWidth: "7rem" }}
              >
                {isLoading ? (
                  <Spinner
                    animation="border"
                    size="sm"
                    style={{ verticalAlign: "middle" }}
                  />
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}

      <Modal
        show={showLeaveModal}
        onHide={() => setShowLeaveModal(false)}
        centered
        size="lg"
      >
        <LeaveStatusModal setShowModal={setShowLeaveModal} />
      </Modal>

      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        centered
        size="lg"
      >
        <EmployeeDetailsModal setShowModal={setShowDetailsModal} />
      </Modal>
    </div>
  );
}

const containerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const gridContainerStyles: React.CSSProperties = {
  display: "grid",
  gap: "1.5rem",
  alignItems: "start",
  gridTemplateColumns: "repeat(2, 1fr)",
  marginTop: "1rem",
};

const cardBodyStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "9rem",
};

const formTextAreaStyles: React.CSSProperties = {
  resize: "none",
  minHeight: "370px",
  marginBottom: "1.5rem",
  marginTop: "0.5rem",
};
