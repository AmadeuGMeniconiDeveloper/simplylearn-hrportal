import { Dispatch, SetStateAction } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

interface EmployeeDetailsProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export function EmployeeDetailsModal({ setShowModal }: EmployeeDetailsProps) {
  const { loggedUser } = useAuth();

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
        <Modal.Title>{loggedUser?.name}'s details</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "20rem",
          overflowY: "auto",
        }}
      >
        {loggedUser ? (
          <Table borderless>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th style={{ textAlign: "right" }}>Selected</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ verticalAlign: "middle" }}>
                <td>{loggedUser.id}</td>
                <td>{loggedUser.name}</td>
                <td>{loggedUser.email}</td>
                <td style={{ textAlign: "right" }}>
                  {loggedUser.selected ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <div style={{ textAlign: "center" }}>No one logged</div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
}
