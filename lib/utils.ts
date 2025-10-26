/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/utils.ts - Production Utilities Collection

// ============================================
// VALIDATION UTILITIES
// ============================================

export const validators = {
  /**
   * Validate email format
   */
  email: (value: string): string | null => {
    if (!value || value.trim() === '') {
      return 'Email wajib diisi';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Format email tidak valid';
    }
    
    return null;
  },

  /**
   * Validate Indonesian phone number
   */
  phone: (value: string): string | null => {
    if (!value || value.trim() === '') {
      return 'Nomor telepon wajib diisi';
    }
    
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length < 10) {
      return 'Nomor telepon terlalu pendek (minimal 10 digit)';
    }
    
    if (cleaned.length > 15) {
      return 'Nomor telepon terlalu panjang (maksimal 15 digit)';
    }
    
    // Check if starts with valid Indonesian prefix
    if (!cleaned.startsWith('08') && !cleaned.startsWith('62')) {
      return 'Nomor harus dimulai dengan 08 atau 62';
    }
    
    return null;
  },

  /**
   * Validate name
   */
  name: (value: string, fieldName: string = 'Nama'): string | null => {
    if (!value || value.trim() === '') {
      return `${fieldName} wajib diisi`;
    }
    
    if (value.trim().length < 3) {
      return `${fieldName} minimal 3 karakter`;
    }
    
    if (value.trim().length > 100) {
      return `${fieldName} maksimal 100 karakter`;
    }
    
    // Check if contains only letters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(value)) {
      return `${fieldName} hanya boleh mengandung huruf dan spasi`;
    }
    
    return null;
  },

  /**
   * Generic required field validator
   */
  required: (value: string, fieldName: string): string | null => {
    if (!value || value.trim() === '') {
      return `${fieldName} wajib diisi`;
    }
    return null;
  },

  /**
   * Minimum length validator
   */
  minLength: (value: string, min: number, fieldName: string): string | null => {
    if (value.length < min) {
      return `${fieldName} minimal ${min} karakter`;
    }
    return null;
  },

  /**
   * Maximum length validator
   */
  maxLength: (value: string, max: number, fieldName: string): string | null => {
    if (value.length > max) {
      return `${fieldName} maksimal ${max} karakter`;
    }
    return null;
  },
};

// ============================================
// PHONE NUMBER UTILITIES
// ============================================

/**
 * Normalize Indonesian phone number to international format
 * 08123456789 -> 628123456789
 * +628123456789 -> 628123456789
 */
export function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Convert 08xxx to 628xxx
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }
  
  // Remove country code if duplicated
  if (cleaned.startsWith('6262')) {
    cleaned = cleaned.substring(2);
  }
  
  // Ensure it starts with 62
  if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  
  return cleaned;
}

/**
 * Format phone number for display
 * 628123456789 -> 0812-3456-789
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  // Convert to local format (08xxx)
  let local = cleaned;
  if (local.startsWith('62')) {
    local = '0' + local.substring(2);
  }
  
  // Format: 0812-3456-789
  if (local.length >= 11) {
    return `${local.substring(0, 4)}-${local.substring(4, 8)}-${local.substring(8)}`;
  }
  
  return local;
}

// ============================================
// CURRENCY FORMATTERS
// ============================================

/**
 * Format number to Indonesian Rupiah
 * 150000 -> "Rp 150.000"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number to short currency format
 * 1500000 -> "Rp 1.5jt"
 */
export function formatCurrencyShort(amount: number): string {
  if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(1)}jt`;
  }
  if (amount >= 1000) {
    return `Rp ${(amount / 1000).toFixed(0)}rb`;
  }
  return formatCurrency(amount);
}

// ============================================
// DATE FORMATTERS
// ============================================

/**
 * Format ISO date to Indonesian format
 * 2024-01-15T10:30:00Z -> "15 Januari 2024"
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/**
 * Format date with time
 * 2024-01-15T10:30:00Z -> "15 Jan 2024, 10:30"
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

/**
 * Get relative time
 * "2 jam yang lalu", "3 hari yang lalu"
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return 'Baru saja';
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  if (diffDay < 30) return `${diffDay} hari yang lalu`;
  if (diffMonth < 12) return `${diffMonth} bulan yang lalu`;
  return `${diffYear} tahun yang lalu`;
}

// ============================================
// STRING UTILITIES
// ============================================

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Generate slug from text
 * "Hello World" -> "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Generate initials from name
 * "John Doe" -> "JD"
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// ============================================
// NUMBER UTILITIES
// ============================================

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format number with thousands separator
 * 1234567 -> "1.234.567"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Generate random number between min and max
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Custom Error Classes
 */
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Parse error to user-friendly message
 */
export function parseError(error: any): string {
  if (error instanceof APIError) {
    return error.message;
  }
  
  if (error instanceof ValidationError) {
    return error.message;
  }
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'Terjadi kesalahan. Silakan coba lagi.';
}

// ============================================
// LOCAL STORAGE UTILITIES
// ============================================

/**
 * Safe localStorage wrapper
 */
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (typeof window === 'undefined') return defaultValue || null;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// ============================================
// URL UTILITIES
// ============================================

/**
 * Build query string from object
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

/**
 * Parse query string to object
 */
export function parseQueryString(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}

// ============================================
// ARRAY UTILITIES
// ============================================

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Remove duplicates from array
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Shuffle array randomly
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ============================================
// DEBOUNCE & THROTTLE
// ============================================

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================
// CLASS NAME UTILITIES
// ============================================

/**
 * Conditionally join class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ============================================
// COPY TO CLIPBOARD
// ============================================

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// ============================================
// DOWNLOAD UTILITIES
// ============================================

/**
 * Download file from URL
 */
export function downloadFile(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}