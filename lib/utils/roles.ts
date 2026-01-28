import { User, UserRole } from "@/types/api";

// Role checking functions
export function checkRole(user: User | null, role: UserRole): boolean {
  return user?.role === role;
}

export function checkAnyRole(user: User | null, roles: UserRole[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}

// Permission helpers
export function canManageUsers(user: User | null): boolean {
  return checkRole(user, UserRole.ADMIN);
}

export function canViewAllTransactions(user: User | null): boolean {
  return checkAnyRole(user, [UserRole.ADMIN, UserRole.AGENT]);
}

export function canExportData(user: User | null): boolean {
  return checkRole(user, UserRole.ADMIN);
}

export function canFundWallet(user: User | null): boolean {
  return checkAnyRole(user, [UserRole.ADMIN, UserRole.AGENT, UserRole.USER, UserRole.RESELLER]);
}

export function canPurchase(user: User | null): boolean {
  return checkAnyRole(user, [UserRole.ADMIN, UserRole.AGENT, UserRole.USER, UserRole.RESELLER]);
}
