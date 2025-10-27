// components/CourseCard.tsx - Fixed dengan font yang lebih ringan
'use client';

import Link from 'next/link';
import { Course } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';

interface CourseCardProps {
  course: Course;
  loading?: boolean;
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="aspect-[16/10] skeleton"></div>
      <div className="p-6 space-y-4">
        <div className="skeleton skeleton-text h-6"></div>
        <div className="skeleton skeleton-text h-4"></div>
        <div className="skeleton skeleton-text h-4"></div>
        <div className="border-t border-neutral-100 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="skeleton h-8 w-24"></div>
            <div className="skeleton h-4 w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseCard({ course, loading = false }: CourseCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return <CourseCardSkeleton />;
  }

  return (
    <Link 
      href={`/courses/${course.slug}?id=${course.variant_unique_id}`}
      className="block group"
    >
      <article className="relative bg-white rounded-2xl border border-neutral-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-neutral-900/10 hover:-translate-y-2 will-change-transform">
        {/* Image Container */}
        <div className="relative aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
          {course.image_url && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton"></div>
              )}
              <Image
                src={course.image_url}
                alt={course.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover transition-all duration-700 ${
                  imageLoaded 
                    ? 'opacity-100 scale-100 group-hover:scale-110' 
                    : 'opacity-0 scale-105'
                }`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          {course.category && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 bg-white/95 backdrop-blur-sm text-neutral-900 text-xs font-medium rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {course.category}
              </span>
            </div>
          )}

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug min-h-[2.5rem] sm:min-h-[3rem]">
            {course.name}
          </h3>
          
          {/* Description */}
          {course.description && (
            <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          )}

          {/* Divider */}
          <div className="border-t border-neutral-100"></div>

          {/* Footer - Price & CTA */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-neutral-900">
                {course.price > 0 ? formatPrice(course.price) : (
                  <span className="text-green-600">Gratis</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
              <span className="hidden sm:inline">Lihat Detail</span>
              <span className="sm:hidden">Detail</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>
      </article>
    </Link>
  );
}