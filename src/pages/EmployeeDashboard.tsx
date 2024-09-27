import { Button, Card, Form, Modal, Toast } from "react-bootstrap";
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
  const { leave, onCreateLeave } = useEmployee();

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Employee Dashboard</h1>

      {loggedUser && (
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            alignItems: "start",
            gridTemplateColumns: "repeat(3, 1fr)",
            marginTop: "1rem",
          }}
        >
          <Card>
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "9rem",
              }}
            >
              <div>
                <Card.Title>Welcome {loggedUser.name}</Card.Title>
                <Card.Text style={{ fontSize: "14px" }}>
                  You are logged in as {loggedUser.email}
                </Card.Text>
              </div>
              <Button variant="dark" onClick={() => setShowDetailsModal(true)}>
                View details
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "9rem",
              }}
            >
              <Card.Title>View Leave Status</Card.Title>
              <Card.Text style={{ fontSize: "14px" }}>
                Here you can check your leave status
              </Card.Text>
              <Button variant="dark" onClick={() => setShowLeaveModal(true)}>
                View status
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div>
                <Card.Title>Apply for Leave</Card.Title>
                <Card.Text style={{ fontSize: "14px" }}>
                  Fill wth reason for leave
                </Card.Text>
              </div>
              <Form id="add-employee-form" onSubmit={handleSubmitLeave}>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    required
                    style={{
                      resize: "vertical",
                      maxHeight: "550px",
                      minHeight: "100px",
                    }}
                    disabled={leave?.status === "pending"}
                    onChange={e => setLeaveReason(e.target.value)}
                    value={leaveReason}
                  ></Form.Control>
                </Form.Group>
              </Form>
              <Button
                variant="dark"
                type="submit"
                form="add-employee-form"
                disabled={leave?.status === "pending"}
              >
                Submit leave
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}

      <Modal
        show={showLeaveModal}
        onHide={() => setShowLeaveModal(false)}
        centered
      >
        <LeaveStatusModal setShowModal={setShowLeaveModal} />
      </Modal>

      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        centered
      >
        <EmployeeDetailsModal setShowModal={setShowDetailsModal} />
      </Modal>
    </div>
  );
}
