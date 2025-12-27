import { apiFetch } from "./api";

export interface CalendarEvent {
    id: number;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    resourceId?: number;
    extendedProps?: any;
}

export function getCalendarEvents() {
    return apiFetch<CalendarEvent[]>("/api/calendar");
}
