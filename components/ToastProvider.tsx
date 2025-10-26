// components/ToastProvider.tsx - Toast notification system
'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        style: {
          background: 'white',
          border: '1px solid #E5E5E5',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: 500,
        },
        className: 'custom-toast',
        duration: 4000,
      }}
    />
  );
}

// Usage helper functions
import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (message: string, description?: string) => {
    return sonnerToast.success(message, {
      description,
      icon: '✅',
    });
  },

  error: (message: string, description?: string) => {
    return sonnerToast.error(message, {
      description,
      icon: '❌',
    });
  },

  info: (message: string, description?: string) => {
    return sonnerToast.info(message, {
      description,
      icon: 'ℹ️',
    });
  },

  warning: (message: string, description?: string) => {
    return sonnerToast.warning(message, {
      description,
      icon: '⚠️',
    });
  },

  loading: (message: string) => {
    return sonnerToast.loading(message);
  },

  promise: <T,>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading,
      success,
      error,
    });
  },

  custom: (component: React.ReactNode | ((id: string | number) => React.ReactElement)) => {
    // sonnerToast.custom expects a render function: (id) => ReactElement
    if (typeof component === 'function') {
      // assume it's already the render function
      return sonnerToast.custom(component as (id: string | number) => React.ReactElement);
    }
    // wrap a React node into the required render function
    return sonnerToast.custom(() => component as React.ReactElement);
  },

  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },
};

// Pre-built toast messages for common scenarios
export const toastMessages = {
  // Success messages
  orderCreated: () => toast.success('Order berhasil dibuat!', 'Silakan lanjutkan ke pembayaran'),
  paymentSuccess: () => toast.success('Pembayaran berhasil!', 'Kamu sudah bisa akses course'),
  enrollmentSuccess: (courseName: string) => 
    toast.success('Enrollment berhasil!', `Kamu sekarang terdaftar di ${courseName}`),
  
  // Error messages
  orderFailed: () => toast.error('Gagal membuat order', 'Silakan coba lagi'),
  paymentFailed: () => toast.error('Pembayaran gagal', 'Silakan coba metode pembayaran lain'),
  networkError: () => toast.error('Koneksi bermasalah', 'Periksa koneksi internet kamu'),
  
  // Info messages
  formIncomplete: () => toast.info('Form belum lengkap', 'Mohon isi semua field yang diperlukan'),
  loginRequired: () => toast.info('Login diperlukan', 'Silakan login untuk melanjutkan'),
  
  // Loading
  processingPayment: () => toast.loading('Memproses pembayaran...'),
  fetchingData: () => toast.loading('Memuat data...'),
};