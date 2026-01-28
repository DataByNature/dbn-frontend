import { User, UserRole } from "../../types/api";
import { getAuthToken, setAuthToken, clearAuthToken } from "../api/client";

// Token storage/retrieval utilities
export function getToken(): string | null {
  return getAuthToken();
}

export function setToken(token: string): void {
  setAuthToken(token);
}

export function removeToken(): void {
  clearAuthToken();
}

// User session management
export function getUserFromStorage(): User | null {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

export function setUserInStorage(user: User): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearUserFromStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

// Role checking helpers
export function hasRole(user: User | null, role: UserRole): boolean {
  return user?.role === role;
}

export function isAdmin(user: User | null): boolean {
  return hasRole(user, UserRole.ADMIN);
}

export function isAgent(user: User | null): boolean {
  return hasRole(user, UserRole.AGENT);
}

export function isUser(user: User | null): boolean {
  return hasRole(user, UserRole.USER);
}

export function isReseller(user: User | null): boolean {
  return hasRole(user, UserRole.RESELLER);
}

// Check if user has any of the specified roles
export function hasAnyRole(user: User | null, roles: UserRole[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}

// Logout utility
export function logout(): void {
  removeToken();
  clearUserFromStorage();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}
