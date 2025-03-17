import { Role } from "../../types/user";

export interface QueryUser {
  role: Role;
  status: "blocked" | "unblocked" | "all";
  search: string;
  page: string;
  sort: "ASC" | "DEC";
  limit: string;
}
