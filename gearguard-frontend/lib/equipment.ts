import { apiFetch } from "@/lib/api";

export interface Equipment {
  id: number;
  name: string;
  serial_number?: string;
  location?: string;
  status?: string;
}

export function getEquipment() {
  return apiFetch<Equipment[]>("/api/equipment");
}
