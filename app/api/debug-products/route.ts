/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/debug-products/route.ts
// Debug endpoint untuk find correct products endpoint
import { NextResponse } from 'next/server';
import axios from 'axios';

const SCALEV_API_BASE = 'https://api.scalev.id/v2';

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    store_id: process.env.SCALEV_STORE_ID,
    attempts: [],
  };

  const client = axios.create({
    baseURL: SCALEV_API_BASE,
    headers: {
      'Authorization': `Bearer ${process.env.SCALEV_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  // List semua kemungkinan endpoint
  const endpoints = [
    {
      name: 'GET /products (no params)',
      method: 'get',
      url: '/products',
      params: {},
    },
    {
      name: 'GET /products?store_unique_id',
      method: 'get',
      url: '/products',
      params: { store_unique_id: process.env.SCALEV_STORE_ID },
    },
    {
      name: 'GET /products?store_id',
      method: 'get',
      url: '/products',
      params: { store_id: process.env.SCALEV_STORE_ID },
    },
    {
      name: `GET /stores/${process.env.SCALEV_STORE_ID}/products`,
      method: 'get',
      url: `/stores/${process.env.SCALEV_STORE_ID}/products`,
      params: {},
    },
    {
      name: 'GET /store/products?store_unique_id',
      method: 'get',
      url: '/store/products',
      params: { store_unique_id: process.env.SCALEV_STORE_ID },
    },
    {
      name: 'GET /product/list?store_unique_id',
      method: 'get',
      url: '/product/list',
      params: { store_unique_id: process.env.SCALEV_STORE_ID },
    },
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`\n🔍 Testing: ${endpoint.name}`);
      
      const response = await client.request({
        method: endpoint.method,
        url: endpoint.url,
        params: endpoint.params,
      });

      const result = {
        name: endpoint.name,
        status: 'SUCCESS ✅',
        status_code: response.status,
        data_structure: {
          has_code: !!response.data?.code,
          has_status: !!response.data?.status,
          has_data: !!response.data?.data,
          has_results: !!response.data?.data?.results,
        },
        product_count: response.data?.data?.results?.length || 
                      response.data?.results?.length || 
                      (Array.isArray(response.data) ? response.data.length : 0),
        sample_product: response.data?.data?.results?.[0] || 
                       response.data?.results?.[0] || 
                       response.data?.[0] || 
                       null,
      };

      results.attempts.push(result);
      console.log(`✅ SUCCESS: Found ${result.product_count} products`);
      
      // If we found products, this is probably the correct endpoint
      if (result.product_count > 0) {
        results.recommended_endpoint = endpoint.name;
        results.success = true;
        break; // Stop after first success with products
      }
    } catch (error: any) {
      const result = {
        name: endpoint.name,
        status: 'FAILED ❌',
        status_code: error.response?.status,
        error_message: error.response?.data?.error || error.message,
        error_details: error.response?.data,
      };

      results.attempts.push(result);
      console.log(`❌ FAILED: ${error.response?.status} - ${error.message}`);
    }
  }

  // Summary
  results.summary = {
    total_attempts: endpoints.length,
    successful: results.attempts.filter((a: any) => a.status.includes('SUCCESS')).length,
    failed: results.attempts.filter((a: any) => a.status.includes('FAILED')).length,
  };

  return NextResponse.json(results, { status: 200 });
}

export const dynamic = 'force-dynamic';