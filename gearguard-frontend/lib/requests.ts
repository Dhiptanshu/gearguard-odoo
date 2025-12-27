import { apiFetch } from "./api";

export type MaintenanceType = "corrective" | "preventive";

export interface CreateRequestPayload {
  subject: string;
  equipment_id: number;
  category_id: number;
  maintenance_type: MaintenanceType;
  assigned_team_id?: number;
  scheduled_date?: string;
  estimated_duration_hours?: number;
  priority?: string;
}


export interface MaintenanceRequest {
  id: number;
  request_number: string;
  subject: string;
  equipment_id: number;
  category_id: number;
  status: string;
  stage: string;
  created_at: string;
  created_by?: string;
  maintenance_type: MaintenanceType;
  priority: string;
}

export function createRequest(payload: CreateRequestPayload) {
  return apiFetch("/api/requests", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getRequests() {
  return apiFetch<MaintenanceRequest[]>("/api/requests");
}

export function updateRequestStage(
  requestId: number,
  stage: string,
  actual_duration_hours?: number
) {
  return apiFetch(`/api/requests/${requestId}/stage`, {
    method: "PATCH",
    body: JSON.stringify({
      stage,
      actual_duration_hours
    })
  });
}
