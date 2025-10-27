/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/courses/route.ts
import { NextResponse } from 'next/server';
import { scalevClient, transformProductToCourse } from '@/lib/scalev';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const variantId = searchParams.get('id');

    // Get single course
    if (variantId) {
      const product = await scalevClient.getProduct(variantId);
      
      // Find the specific variant in the product
      const variant = product.variants?.find((v: any) => v.unique_id === variantId) || product.variants?.[0];
      
      if (!variant) {
        return NextResponse.json(
          { error: 'Variant not found' },
          { status: 404 }
        );
      }

      // Transform single variant to course
      const image = variant.self_file_urls?.[0] || 
                    variant.images?.[0] || 
                    product.images?.[0] || 
                    null;

      const price = variant.price || 
                    variant.base_price || 
                    variant.selling_price ||
                    0;

      const course = {
        variant_unique_id: variant.unique_id,
        name: variant.name,
        description: product.description || '',
        price: price,
        image_url: image,
        slug: (variant.name || '').toLowerCase().replace(/\s+/g, '-'),
        category: product.item_type_name || 'Course',
        product_id: product.id,
        product_name: product.name,
        variant_id: variant.id,
        // Include all variants for reference (jika user mau lihat opsi lain)
        available_variants: product.variants?.map((v: any) => ({
          variant_unique_id: v.unique_id,
          name: v.name,
          price: v.price || 0,
        })),
      };
      
      return NextResponse.json(course);
    }

// Get all courses
    const products = await scalevClient.getProducts();
    
    // Transform products to courses - handle empty results
    if (!products || products.length === 0) {
      console.log('⚠️ No products found from Scalev');
      return NextResponse.json([]);
    }

    const courses = products
      .map(transformProductToCourse)
      .flat()
      .filter(course => course && course.variant_unique_id); // Filter out invalid courses

    console.log(`✅ Transformed ${courses.length} courses`);
    
    // Sort by price (optional)
    courses.sort((a, b) => a.price - b.price);

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses from Scalev:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Cache untuk 5 menit (300 seconds)
export const revalidate = 300;