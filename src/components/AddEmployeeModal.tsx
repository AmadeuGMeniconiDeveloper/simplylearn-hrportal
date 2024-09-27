import { Dispatch, SetStateAction } from "react";
import { Button, Modal, Spinner, Table, Toast } from "react-bootstrap";
import { useEmployer } from "../hooks/useEmployer";
import { Message, User } from "../server/api/types";
import { toast } from "sonner";

interface AddEmployeeModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}
export function AddEmployeeModal({ setShowModal }: AddEmployeeModalProps) {
  const { nonSelectedEmployees, isLoading, onAddEmployee } = useEmployer();

  async function handleAddEmployee(employee: User) {
    const { code, body }: Message = await onAddEmployee(employee);

    if (code === "OK") {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      ));
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
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Modal.Title>Add employee</Modal.Title>
        Register new employees to your organization
      </Modal.Header>
      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          height: "30rem",
          overflowY: "auto",
        }}
      >
        <Table striped borderless>
          <thead>
            <tr>
              <th>Employee</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {nonSelectedEmployees.map(employee => (
              <tr key={employee.id} style={{ verticalAlign: "middle" }}>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <span>
                      <strong>{employee.name}</strong>
                    </span>
                    <span>{employee.id}</span>
                  </div>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Button
                    size="sm"
                    variant="dark"
                    onClick={() => handleAddEmployee(employee)}
                    disabled={isLoading}
                    style={{
                      minWidth: "3.5rem",
                    }}
                  >
                    {isLoading ? (
                      <Spinner
                        animation="border"
                        size="sm"
                        style={{ verticalAlign: "middle" }}
                      />
                    ) : (
                      <span style={{ verticalAlign: "middle" }}>Add</span>
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
}
