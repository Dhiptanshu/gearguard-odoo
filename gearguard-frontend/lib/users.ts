import { apiFetch } from "./api";

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: string;
}

export function getCurrentUser() {
  return apiFetch<User>("/api/users/me");
}

export function getUsers() {
  return apiFetch<User[]>("/api/users");
}
