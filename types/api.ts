// User and Role Types
export enum UserRole {
  ADMIN = "admin",
  AGENT = "agent",
  USER = "user",
  RESELLER = "reseller",
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  wallet_balance?: number;
  status: "active" | "suspended" | "inactive";
  created_at: string;
  updated_at: string;
}

// Transaction Types
export enum TransactionType {
  AIRTIME = "airtime",
  DATA = "data",
  WALLET_CREDIT = "wallet_credit",
  WALLET_DEBIT = "wallet_debit",
}

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

export enum Network {
  MTN = "MTN",
  GLO = "GLO",
  AIRTEL = "AIRTEL",
  NINEMOBILE = "9MOBILE",
}

export interface Transaction {
  id: string;
  user?: User;
  agent?: User;
  network: Network;
  type: TransactionType;
  amount: number;
  phone: string;
  status: TransactionStatus;
  provider_ref?: string;
  internal_ref?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Product Types
export enum ProductCategory {
  DATA = "data",
  AIRTIME = "airtime",
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  network: Network;
  size?: string; // For data plans (e.g., "1GB", "2GB")
  price: number;
  validity?: string; // For data plans (e.g., "30 days")
  is_active: boolean;
}

// Wallet Types
export interface Wallet {
  id: string;
  user: string;
  balance: number;
  currency: string;
  last_updated: string;
}

export interface WalletTransaction {
  id: string;
  wallet: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
  balance_after: number;
  description: string;
  created_at: string;
}

// Dashboard KPI Types
export interface DashboardKPIs {
  today_volume: number;
  successful_vends: number;
  failed_vends: number;
  wallet_balance: number;
}

// API Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface BuyAirtimeRequest {
  network: Network;
  phone: string;
  amount: number;
  save_beneficiary?: boolean;
}

export interface BuyDataRequest {
  network: Network;
  phone: string;
  product_id: string;
}

export interface FundWalletRequest {
  amount: number;
  payment_method: string;
}

export interface FundWalletResponse {
  payment_url: string;
  transaction_id: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// API Response Wrappers
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
