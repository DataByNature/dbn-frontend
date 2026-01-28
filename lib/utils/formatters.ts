import { format, formatDistanceToNow } from "date-fns";

// Currency formatting
export function formatCurrency(amount: number, currency: string = "NGN"): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Date formatting
export function formatDate(date: string | Date, formatStr: string = "MMM dd, yyyy"): string {
  return format(new Date(date), formatStr);
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), "MMM dd, yyyy HH:mm");
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

// Phone number formatting
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");
  
  // Format Nigerian phone numbers (10 or 11 digits)
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  }
  
  return phone;
}

// Number formatting
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-NG").format(num);
}
