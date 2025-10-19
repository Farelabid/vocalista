/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/types.ts

// Course adalah mapping dari Scalev Product
export interface Course {
  variant_unique_id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  slug: string; // Buat dari name
  category?: string;
  duration?: string; // Simpan di description atau custom field
  instructor?: string;
}

// Order adalah mapping dari Scalev Order
export interface Order {
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: 'pending' | 'paid' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed';
  created_at: string;
  updated_at: string;
  total_amount: number;
  items: OrderItem[];
}

export interface OrderItem {
  variant_unique_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

// User session (simple, tanpa complex auth)
export interface UserSession {
  email: string;
  name: string;
  phone: string;
}

// Enrollment adalah Order yang sudah paid
export interface Enrollment {
  course_id: string;
  course_name: string;
  enrolled_at: string;
  order_id: string;
}

// Lesson structure (disimpan dalam course description atau custom field)
export interface Lesson {
  id: string;
  title: string;
  video_url: string;
  duration: number;
  order: number;
}

// Webhook payload dari Scalev
export interface WebhookPayload {
  event: 'order.payment_status_changed' | string;
  data: {
    order_id: string;
    payment_status: string;
    customer_email: string;
    [key: string]: any;
  };
}