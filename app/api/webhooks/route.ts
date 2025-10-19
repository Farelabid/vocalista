/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/webhooks/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Verify webhook signature dari Scalev
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

export async function POST(request: Request) {
  console.log('📨 Webhook received');
  
  try {
    // Get raw body untuk signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('x-scalev-signature') || 
                      request.headers.get('x-signature') || '';
    
    // Verify signature jika ada webhook secret
    if (process.env.SCALEV_WEBHOOK_SECRET) {
      const isValid = verifyWebhookSignature(
        rawBody,
        signature,
        process.env.SCALEV_WEBHOOK_SECRET
      );

      if (!isValid) {
        console.error('❌ Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
      console.log('✅ Signature verified');
    } else {
      console.warn('⚠️  No webhook secret configured - skipping verification');
    }

    const payload = JSON.parse(rawBody);
    console.log('📦 Webhook payload:', {
      event: payload.event,
      order_id: payload.data?.id || payload.data?.order_id,
    });

    // Handle different webhook events
    switch (payload.event) {
      case 'order.payment_status_changed':
      case 'order.paid':
        await handlePaymentSuccess(payload.data);
        break;
      
      case 'order.created':
        console.log('📝 Order created:', payload.data?.id);
        break;
      
      case 'order.cancelled':
        console.log('❌ Order cancelled:', payload.data?.id);
        break;
      
      default:
        console.log('ℹ️  Unhandled event:', payload.event);
    }

    // PENTING: Selalu return 200 OK segera
    return NextResponse.json({ received: true }, { status: 200 });
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    // Tetap return 200 agar Scalev tidak retry terus
    return NextResponse.json({ received: false }, { status: 200 });
  }
}

// Handle payment success
async function handlePaymentSuccess(orderData: any) {
  const {
    id,
    order_id,
    payment_status,
    customer_email,
    customer_name,
  } = orderData;

  console.log(`💰 Payment confirmed for order ${id || order_id}`);
  console.log(`📧 Customer: ${customer_name} (${customer_email})`);

  // TODO: Implement actions after payment success:
  // 1. Send email confirmation
  // 2. Grant access to course/product
  // 3. Update internal database
  // 4. Send notification to Slack/Discord
  // 5. Trigger other business logic

  // Contoh: Log enrollment untuk debugging
  console.log('🎓 Course access granted:', {
    email: customer_email,
    products: orderData.ordervariants || orderData.items,
    timestamp: new Date().toISOString(),
  });

  // You can add email sending logic here
  // await sendConfirmationEmail(customer_email, orderData);
  
  // Or update your database
  // await db.enrollments.create({ ... });
}

// Optional: GET endpoint untuk testing webhook connectivity
export async function GET() {
  return NextResponse.json({
    status: 'Webhook endpoint is active',
    timestamp: new Date().toISOString(),
  });
}