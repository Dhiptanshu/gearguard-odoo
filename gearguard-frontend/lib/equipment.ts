import { apiFetch } from "@/lib/api";

export interface Equipment {
  id: number;
  name: string;
  serial_number?: string;
  location?: string;
  status?: string;
  department?: string;
  employee?: string;
  category_id?: number;
}

export function getEquipment() {
  return apiFetch<Equipment[]>("/api/equipment");
}
