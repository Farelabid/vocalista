// components/SimpleToast.tsx - Alternative tanpa Context API
'use client';

import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

// Global state (simple)
let toasts: ToastMessage[] = [];
let listeners: Array<(toasts: ToastMessage[]) => void> = [];

// Subscribe to changes
function subscribe(listener: (toasts: ToastMessage[]) => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

// Notify all listeners
function notify() {
  listeners.forEach(listener => listener([...toasts]));
}

// Add toast
function addToast(type: ToastType, message: string, duration = 5000) {
  const id = Math.random().toString(36).substring(2, 9);
  const toast: ToastMessage = { id, type, message };
  
  toasts.push(toast);
  notify();

  // Auto remove
  setTimeout(() => {
    removeToast(id);
  }, duration);
}

// Remove toast
function removeToast(id: string) {
  toasts = toasts.filter(t => t.id !== id);
  notify();
}

// Export simple API
export const toast = {
  success: (message: string, duration?: number) => addToast('success', message, duration),
  error: (message: string, duration?: number) => addToast('error', message, duration),
  warning: (message: string, duration?: number) => addToast('warning', message, duration),
  info: (message: string, duration?: number) => addToast('info', message, duration),
};

// Toast Container Component
export function ToastContainer() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  useEffect(() => {
    return subscribe(setMessages);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-md w-full px-4 pointer-events-none">
      {messages.map(msg => (
        <ToastItem 
          key={msg.id} 
          toast={msg} 
          onRemove={() => removeToast(msg.id)} 
        />
      ))}
    </div>
  );
}

// Toast Item
function ToastItem({ 
  toast: msg, 
  onRemove 
}: { 
  toast: ToastMessage; 
  onRemove: () => void;
}) {
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(onRemove, 300);
  };

  const getStyles = () => {
    switch (msg.type) {
      case 'success':
        return {
          bg: 'bg-green-50 border-green-200',
          icon: 'text-green-600',
          text: 'text-green-900',
          iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200',
          icon: 'text-red-600',
          text: 'text-red-900',
          iconPath: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          icon: 'text-yellow-600',
          text: 'text-yellow-900',
          iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: 'text-blue-600',
          text: 'text-blue-900',
          iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`${styles.bg} border-2 rounded-xl shadow-lg p-4 flex items-start gap-3 transition-all duration-300 pointer-events-auto ${
        isExiting 
          ? 'opacity-0 translate-x-full' 
          : 'opacity-100 translate-x-0'
      }`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-6 h-6 ${styles.icon}`}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={styles.iconPath} />
        </svg>
      </div>

      {/* Message */}
      <p className={`flex-1 text-sm font-medium ${styles.text} leading-relaxed`}>
        {msg.message}
      </p>

      {/* Close Button */}
      <button
        onClick={handleRemove}
        className={`flex-shrink-0 ${styles.icon} hover:opacity-70 transition-opacity`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// ============================================
// USAGE EXAMPLE:
// ============================================

/*
// 1. Add ToastContainer to layout.tsx:

import { ToastContainer } from '@/components/SimpleToast';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}

// 2. Use in any component (NO useToast hook needed!):

import { toast } from '@/components/SimpleToast';

// In your component:
const handleSubmit = async () => {
  try {
    await submitForm();
    toast.success('Form submitted successfully!');
  } catch (error) {
    toast.error('Failed to submit form');
  }
};

// Other examples:
toast.success('Pembayaran berhasil!');
toast.error('Gagal memproses pembayaran');
toast.warning('Sesi akan berakhir dalam 5 menit');
toast.info('Course baru tersedia!');

*/