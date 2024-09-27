import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {
  addEmployee,
  getSelectedEmployees,
  getNonSelectedEmployees,
  removeEmployee,
} from "../server/api/calls";

import { toast } from "sonner";

import { Toast } from "react-bootstrap";

import { User } from "../server/api/types";

type EmployerContext = {
  selectedEmployees: User[];
  nonSelectedEmployees: User[];
  isLoading: boolean;
  handleAddEmployee: (uswer: User) => Promise<void>;
  handleRemoveEmployee: (user: User) => Promise<void>;
  handleGetSelectedEmployees: () => void;
  handleGetNonSelectedEmployees: () => void;
};

export const EmployerContext = createContext<EmployerContext | undefined>(
  undefined
);

type EmployerProviderProps = PropsWithChildren;

export function EmployerProvider({ children }: EmployerProviderProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<User[]>([]);
  const [nonSelectedEmployees, setNonSelectedEmployees] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddEmployee(user: User) {
    setIsLoading(true);
    try {
      await addEmployee(user);

      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Employee added to organization.</Toast.Body>
        </Toast>
      ));

      setIsLoading(false);
    } catch {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Could not add employee.</Toast.Body>
        </Toast>
      ));

      setIsLoading(false);
    }
  }

  async function handleRemoveEmployee(user: User) {
    setIsLoading(true);
    try {
      await removeEmployee(user);

      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Employee removed from organization.</Toast.Body>
        </Toast>
      ));

      setIsLoading(false);
    } catch {
      toast.custom(() => (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Could not remove employee.</Toast.Body>
        </Toast>
      ));

      setIsLoading(false);
    }
  }

  async function handleGetSelectedEmployees() {
    const [, data] = await getSelectedEmployees();
    setSelectedEmployees(data);
  }

  async function handleGetNonSelectedEmployees() {
    const [, data] = await getNonSelectedEmployees();
    setNonSelectedEmployees(data);
  }

  useEffect(() => {
    handleGetSelectedEmployees();
    handleGetNonSelectedEmployees();
  }, [isLoading]);

  return (
    <EmployerContext.Provider
      value={{
        selectedEmployees,
        nonSelectedEmployees,
        isLoading,
        handleAddEmployee,
        handleRemoveEmployee,
        handleGetSelectedEmployees,
        handleGetNonSelectedEmployees,
      }}
    >
      {children}
    </EmployerContext.Provider>
  );
}
