// lib/auth.ts
import { apiFetch } from "./api";

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    department?: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append("username", email); // OAuth2 expects 'username'
    formData.append("password", password);

    const res = await fetch("http://localhost:8000/token", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    return res.json();
}

export async function signup(name: string, email: string, password: string): Promise<AuthResponse> {
    return apiFetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
}

export function saveToken(token: string) {
    localStorage.setItem("token", token);
}

export function getToken() {
    return localStorage.getItem("token");
}

export function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
}
