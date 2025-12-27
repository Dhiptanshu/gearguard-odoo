import { apiFetch } from "./api";

export interface Category {
  id: number;
  name: string;
}

export function getCategories(): Promise<Category[]> {
  return apiFetch("/api/categories");
}
