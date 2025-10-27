/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/scalev.ts - Production Ready Scalev API Client
// lib/scalev.ts - Production Ready Scalev API Client
import axios, { AxiosInstance } from 'axios';

const SCALEV_API_BASE = 'https://api.scalev.id/v2';

interface ScalevResponse<T> {
  code: number;
  status: string;
  data: T;
}

interface PaginatedResponse<T> {
  results: T[];
  has_next: boolean;
  page?: number;
  last_id?: number;
  page_size: number;
}

class ScalevClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: SCALEV_API_BASE,
      headers: {
        'Authorization': `Bearer ${process.env.SCALEV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Log requests untuk debugging
    this.client.interceptors.request.use((config) => {
      console.log(`📡 ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    });

    // Handle response format dari Scalev
    this.client.interceptors.response.use(
      (response) => {
        // Scalev wraps data dalam { code, status, data }
        return response;
      },
      (error) => {
        console.error('❌ Scalev API Error:', {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error;
      }
    );
  }

  // Get store info (untuk verifikasi)
  async getStore() {
    try {
      const response = await this.client.get<ScalevResponse<any>>(
        `/stores/simplified`,
        {
          params: {
            search: process.env.SCALEV_STORE_ID,
          },
        }
      );
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching store:', error);
      throw error;
    }
  }

  async getProducts(storeId?: string) {
    const targetStoreId = storeId || process.env.SCALEV_STORE_ID;
    
    if (!targetStoreId) {
      throw new Error('SCALEV_STORE_ID is not configured');
    }

    console.log(`🔍 Fetching products for store: ${targetStoreId}`);
    
    // Try multiple endpoint variations
    const endpoints = [
      {
        method: 'get',
        url: '/products',
        params: { store_unique_id: targetStoreId },
        name: 'GET /products?store_unique_id'
      },
      {
        method: 'get',
        url: `/stores/${targetStoreId}/products`,
        params: {},
        name: `GET /stores/${targetStoreId}/products`
      },
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`🔍 Trying: ${endpoint.name}`);
        
        const response = await this.client.request({
          method: endpoint.method,
          url: endpoint.url,
          params: endpoint.params,
        });

        const products = response.data.data.results || [];
        console.log(`✅ Success! Found ${products.length} products with ${endpoint.name}`);
        
        if (products.length === 0) {
          console.warn('⚠️ No products found. Please add products in Scalev dashboard.');
          return [];
        }

        // Fetch detailed info for prices
        console.log('💰 Fetching product details for prices...');
        const detailedProducts = await Promise.all(
          products.map(async (product: any) => {
            try {
              const detailResponse = await this.client.get(
                `/products/${product.id}`
              );
              return detailResponse.data.data;
            } catch (error) {
              console.error(`❌ Failed to get detail for product ${product.id}`);
              return product;
            }
          })
        );
        
        return detailedProducts;
      } catch (error: any) {
        console.log(`❌ Failed: ${endpoint.name} - ${error.response?.status || error.message}`);
        continue;
      }
    }

    throw new Error('All product endpoints failed. Check Scalev API documentation.');
  }

  // Get single product by ID or variant ID
  async getProduct(productIdOrVariantId: string) {
    try {
      // Jika ini variant ID, kita perlu fetch semua products dulu
      // karena Scalev tidak punya endpoint /variants/{id}
      
      if (productIdOrVariantId.startsWith('variant_')) {
        console.log('🔍 Fetching products to find variant:', productIdOrVariantId);
        
        // Get all products
        const products = await this.getProducts();
        
        // Find product yang mengandung variant ini
        const product = products.find((p: any) => 
          p.variants?.some((v: any) => v.unique_id === productIdOrVariantId)
        );
        
        if (!product) {
          throw new Error(`Product with variant ${productIdOrVariantId} not found`);
        }
        
        console.log('✅ Found product:', product.name);
        return product;
      }
      
      // Jika product ID biasa
      const response = await this.client.get<ScalevResponse<any>>(
        `/products/${productIdOrVariantId}`
      );
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Get bundles from store
  async getBundles(storeId?: string) {
    try {
      const targetStoreId = storeId || process.env.SCALEV_STORE_ID;
      
      const response = await this.client.get<ScalevResponse<PaginatedResponse<any>>>(
        `/stores/${targetStoreId}/bundles`
      );

      return response.data.data.results;
    } catch (error) {
      console.error('Error fetching bundles:', error);
      return []; // Return empty array if no bundles
    }
  }

  // Create order (Digital Product)
  async createOrder(orderData: {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    variant_unique_id: string;
    quantity?: number;
    payment_method?: string;
  }) {
    try {
      const payload = {
        store_unique_id: process.env.SCALEV_STORE_ID,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        ordervariants: [
          {
            quantity: orderData.quantity || 1,
            variant_unique_id: orderData.variant_unique_id,
          },
        ],
        payment_method: orderData.payment_method || 'invoice',
      };

      console.log('📦 Creating order:', {
        email: orderData.customer_email,
        product: orderData.variant_unique_id,
      });

      const response = await this.client.post<ScalevResponse<any>>(
        '/order',
        payload
      );

      const orderResult = response.data.data;

      // Build payment URL
      const paymentUrl = `https://app.scalev.id/order/public/${orderResult.secret_slug}/success`;

      console.log('✅ Order created:', {
        order_id: orderResult.id,
        secret_slug: orderResult.secret_slug,
      });

      return {
        order: orderResult,
        paymentUrl,
      };
    } catch (error: any) {
      console.error('Error creating order:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error || 
        'Failed to create order. Please try again.'
      );
    }
  }

  // Get orders by customer email
  async getOrdersByEmail(email: string) {
    try {
      const response = await this.client.get<ScalevResponse<PaginatedResponse<any>>>(
        '/orders',
        {
          params: {
            customer_email: email,
            store_unique_id: process.env.SCALEV_STORE_ID,
          },
        }
      );

      return response.data.data.results;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  // Get single order details
  async getOrder(orderId: string) {
    try {
      const response = await this.client.get<ScalevResponse<any>>(
        `/orders/${orderId}`
      );

      return response.data.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  // Check order payment status
  async checkPaymentStatus(orderId: string) {
    try {
      const response = await this.client.get<ScalevResponse<any>>(
        `/orders/${orderId}/payment-status`
      );

      return response.data.data;
    } catch (error) {
      console.error('Error checking payment status:', error);
      throw error;
    }
  }
}

export const scalevClient = new ScalevClient();

// Helper function untuk transform product data ke Course format
export function transformProductToCourse(product: any) {
  // Jika product punya multiple variants, expand jadi multiple courses
  if (product.is_multiple && product.variants && product.variants.length > 0) {
    // Return array of courses (1 per variant)
    return product.variants.map((variant: any) => {
      const image = variant.self_file_urls?.[0] || 
                    variant.images?.[0] || 
                    product.images?.[0] || 
                    null;

      // Get price from Scalev API - returned as STRING, parse to number
      let price = 0;

      if (variant.price) {
        price = parseFloat(variant.price);
      } else if (variant.price_bt) {
        price = parseFloat(variant.price_bt);
      } else if (variant.base_price) {
        price = parseFloat(variant.base_price);
      }

      if (price === 0) {
        console.warn(`⚠️ No price found for variant: ${variant.name} (${variant.unique_id})`);
        console.warn(`💡 Set price in Scalev dashboard for this variant`);
      }

      return {
        variant_unique_id: variant.unique_id,
        name: variant.name,
        description: product.description || product.rich_description || '',
        price: price,
        image_url: image,
        slug: (variant.name || '').toLowerCase().replace(/\s+/g, '-'),
        category: product.item_type_name || 'Course',
        product_id: product.id,
        product_name: product.name,
        variant_id: variant.id,
        is_variant: true,
      };
    });
  }

  // Jika product tidak punya variants atau single variant
  const firstVariant = product.variants?.[0] || {};
  const image = firstVariant.self_file_urls?.[0] || 
                firstVariant.images?.[0] || 
                product.images?.[0] || 
                null;

  let price = 0;
  
  if (firstVariant.price) {
    price = parseFloat(firstVariant.price);
  } else if (firstVariant.price_bt) {
    price = parseFloat(firstVariant.price_bt);
  } else if (product.price) {
    price = parseFloat(product.price);
  }

  return [{
    variant_unique_id: firstVariant.unique_id || product.uuid || product.id?.toString(),
    name: product.name || product.display,
    description: product.description || product.rich_description || '',
    price: price,
    image_url: image,
    slug: (product.name || '').toLowerCase().replace(/\s+/g, '-'),
    category: product.item_type_name || 'Course',
    product_id: product.id,
    variant_id: firstVariant.id,
    is_variant: false,
  }];
}