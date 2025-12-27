import { apiFetch } from "./api";

export interface Team {
    id: number;
    name: string;
}

export function getTeams() {
    return apiFetch<Team[]>("/api/teams");
}
