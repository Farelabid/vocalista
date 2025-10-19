/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { scalevClient } from '@/lib/scalev';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { customer_name, customer_email, customer_phone, variant_unique_id } = body;

    // Validasi input
    if (!customer_name || !customer_email || !customer_phone || !variant_unique_id) {
      return NextResponse.json(
        { error: 'Missing required fields: customer_name, customer_email, customer_phone, variant_unique_id' },
        { status: 400 }
      );
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer_email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validasi format phone (harus dimulai dengan 62 atau 08)
    let phone = customer_phone.replace(/\D/g, ''); // Remove non-digits
    if (phone.startsWith('0')) {
      phone = '62' + phone.substring(1);
    } else if (!phone.startsWith('62')) {
      phone = '62' + phone;
    }

    // Create order di Scalev
    const result = await scalevClient.createOrder({
      customer_name,
      customer_email,
      customer_phone: phone,
      variant_unique_id,
      quantity: 1,
    });

    return NextResponse.json({
      success: true,
      order: result.order,
      paymentUrl: result.paymentUrl,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create order',
        details: error.response?.data,
      },
      { status: 500 }
    );
  }
}

// GET untuk mendapatkan orders by customer email
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const orders = await scalevClient.getOrdersByEmail(email);
    
    // Filter hanya yang paid dan transform ke enrollment format
    const enrollments = orders
      .filter((order: any) => order.payment_status === 'paid' || order.status === 'paid')
      .map((order: any) => {
        // Get first item from order
        const firstItem = order.ordervariants?.[0] || order.items?.[0];
        
        return {
          course_id: firstItem?.variant_unique_id || firstItem?.product_id,
          course_name: firstItem?.product_name || firstItem?.name || 'Course',
          enrolled_at: order.created_at || new Date().toISOString(),
          order_id: order.id || order.order_id,
          payment_status: order.payment_status || order.status,
        };
      });

    return NextResponse.json(enrollments);
  } catch (error: any) {
    console.error('Get orders error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch orders',
        message: error.message,
      },
      { status: 500 }
    );
  }
}