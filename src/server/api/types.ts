export interface User {
  role: "employer" | "employee";
  id: string;
  name: string;
  email: string;
  password: string;
  selected: boolean;
  leave?: Leave;
}

export interface Leave {
  status: "pending" | "approved" | "denied";
  body: string;
}

export interface Session {
  id: string;
  user: string;
  token: string;
}

export type Message = {
  code: "OK" | "FAIL";
  body: string;
};
