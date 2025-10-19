/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/test-scalev/route.ts
// Test endpoint untuk verify koneksi ke Scalev API
import { NextResponse } from 'next/server';
import { scalevClient } from '@/lib/scalev';

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    config: {
      api_key_set: !!process.env.SCALEV_API_KEY,
      store_id_set: !!process.env.SCALEV_STORE_ID,
      webhook_secret_set: !!process.env.SCALEV_WEBHOOK_SECRET,
    },
    tests: {},
  };

  try {
    // Test 1: Get Store Info
    console.log('🧪 Testing: Get Store Info...');
    try {
      const store = await scalevClient.getStore();
      results.tests.store = {
        status: 'success',
        data: store,
      };
      console.log('✅ Store info retrieved');
    } catch (error: any) {
      results.tests.store = {
        status: 'error',
        error: error.message,
      };
      console.error('❌ Failed to get store info');
    }

    // Test 2: Get Products
    console.log('🧪 Testing: Get Products...');
    try {
      const products = await scalevClient.getProducts();
      results.tests.products = {
        status: 'success',
        count: products.length,
        sample: products[0] || null,
        products: products.map((p: any) => ({
          id: p.variant_unique_id || p.id,
          name: p.name,
          price: p.price,
        })),
      };
      console.log(`✅ Found ${products.length} products`);
    } catch (error: any) {
      results.tests.products = {
        status: 'error',
        error: error.message,
        details: error.response?.data || 'No additional details',
        status_code: error.response?.status,
      };
      console.error('❌ Failed to get products');
      console.error('Error details:', error.response?.data);
    }

    // Test 3: Get Bundles (optional)
    console.log('🧪 Testing: Get Bundles...');
    try {
      const bundles = await scalevClient.getBundles();
      results.tests.bundles = {
        status: 'success',
        count: bundles.length,
      };
      console.log(`✅ Found ${bundles.length} bundles`);
    } catch (error: any) {
      results.tests.bundles = {
        status: 'error',
        error: error.message,
      };
      console.error('❌ Failed to get bundles');
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        ...results,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Disable caching untuk test endpoint
export const dynamic = 'force-dynamic';