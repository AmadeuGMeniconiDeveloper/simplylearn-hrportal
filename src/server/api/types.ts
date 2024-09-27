export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "employer" | "employee";
  selected: boolean;
}

export interface Session {
  id: string;
  user: string;
  token: string;
}
