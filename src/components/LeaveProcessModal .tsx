import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Modal, Table, Toast } from "react-bootstrap";
import { Leave, Message, User } from "../server/api/types";
import { useEmployer } from "../hooks/useEmployer";
import { toast } from "sonner";

interface LeaveProcessProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  employee?: User;
}

export function LeaveProcessModal({
  setShowModal,
  employee,
}: LeaveProcessProps) {
  const [status, setStatus] = useState<Leave["status"]>("pending");

  const { onProcessLeave } = useEmployer();

  async function handleLeaveProcessSubmit(e: React.FormEvent, employee: User) {
    e.preventDefault();

    const { code, body }: Message = await onProcessLeave(employee, status);

    if (code === "OK") {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      ));

      setShowModal(false);
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
    <>
      <Modal.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Modal.Title>Leave Status</Modal.Title>
        <div
          style={{
            textTransform: "capitalize",
            color:
              employee?.leave?.status === "approved"
                ? "green"
                : employee?.leave?.status === "denied"
                ? "red"
                : "gray",
          }}
        >
          {employee?.leave?.status}
        </div>
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "20rem",
          overflowY: "auto",
        }}
      >
        {employee?.leave ? (
          <Table borderless size="sm">
            <thead>
              <tr>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p
                    style={{
                      inlineSize: "15rem",
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    {employee.leave.body}
                  </p>
                </td>
                <td>
                  <Form
                    id="leave-form"
                    onSubmit={e => handleLeaveProcessSubmit(e, employee)}
                  >
                    <Form.Select
                      size="sm"
                      name="status"
                      disabled={employee?.leave?.status !== "pending"}
                      defaultValue={status}
                      onChange={e =>
                        setStatus(e.target.value as Leave["status"])
                      }
                    >
                      <option value="pending"></option>
                      <option value="approved">Approve</option>
                      <option value="denied">Deny</option>
                    </Form.Select>
                  </Form>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <div style={{ textAlign: "center" }}>No leave submited</div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button
          variant="dark"
          type="submit"
          form="leave-form"
          disabled={status === "pending"}
        >
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
}
