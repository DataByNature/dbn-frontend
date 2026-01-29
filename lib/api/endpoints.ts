// API Endpoint Constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  // Authentication
  REGISTER: "/api/v1/auth/register/",
  LOGIN: "/api/v1/auth/login/",
  REFRESH: "/api/v1/auth/refresh/",
  RESET_PASSWORD: "/api/v1/auth/reset-password/",
  
  // User
  USER_PROFILE: "/api/v1/auth/profile/",
  UPDATE_PROFILE: "/api/v1/auth/profile/",
  
  // Dashboard
  DASHBOARD_KPIS: "/api/v1/dashboard/kpis/",
  DASHBOARD_SALES: "/api/v1/dashboard/sales/",
  DASHBOARD_NETWORK_DISTRIBUTION: "/api/v1/dashboard/network-distribution/",
  
  // Transactions
  TRANSACTIONS: "/api/v1/transactions/",
  TRANSACTION_DETAIL: (id: string) => `/api/v1/transactions/${id}/`,
  
  // Purchases
  BUY_AIRTIME: "/api/v1/buy-airtime/",
  BUY_DATA: "/api/v1/buy-data/",
  
  // Wallet
  WALLET: "/api/v1/wallet/",
  WALLET_HISTORY: "/api/v1/wallet/ledger/",
  INITIATE_DEPOSIT: "/api/v1/wallet/initiate-deposit/",
  
  // Products
  PRODUCTS: "/api/v1/products/",
  PRODUCT_DETAIL: (id: string) => `/api/v1/products/${id}/`,
  
  // Users (Admin)
  USERS: "/api/v1/users/",
  USER_DETAIL: (id: string) => `/api/v1/users/${id}/`,
  CREATE_USER: "/api/v1/users/",
  UPDATE_USER: (id: string) => `/api/v1/users/${id}/`,
  SUSPEND_USER: (id: string) => `/api/v1/users/${id}/suspend/`,

  // Notifications
  NOTIFICATIONS: "/api/v1/notifications/",
  NOTIFICATION_MARK_READ: (id: number | string) => `/api/v1/notifications/${id}/mark-read/`,
  NOTIFICATION_MARK_ALL_READ: "/api/v1/notifications/mark-all-read/",
  NOTIFICATION_PREFERENCES: "/api/v1/notifications/preferences/",
  NOTIFICATION_PREFERENCES_UPDATE: "/api/v1/notifications/preferences/update/",
} as const;
