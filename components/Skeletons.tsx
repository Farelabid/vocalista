// components/Skeleton.tsx - Enhanced with shimmer (FIXED)
import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  shimmer?: boolean;
}

export function Skeleton({ 
  className = '', 
  width, 
  height,
  shimmer = true 
}: SkeletonProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`bg-neutral-200 dark:bg-neutral-800 rounded-lg ${
        shimmer ? 'skeleton' : 'animate-pulse'
      } ${className}`}
      style={style}
      role="status"
      aria-label="Loading..."
    />
  );
}

// Course Card Skeleton with shimmer
export function CourseCardSkeleton() {
  return (
    <article className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <Skeleton className="aspect-[16/10]" shimmer />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" shimmer />
        <Skeleton className="h-6 w-1/2" shimmer />
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-full" shimmer />
          <Skeleton className="h-4 w-5/6" shimmer />
        </div>
        <div className="border-t border-neutral-100 my-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-24" shimmer />
          <Skeleton className="h-5 w-20" shimmer />
        </div>
      </div>
    </article>
  );
}

// Courses Grid Skeleton
export function CoursesGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Course Detail Skeleton - TAMBAHAN YANG HILANG
export function CourseDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
      {/* Navigation Skeleton */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-neutral-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </nav>

      {/* Main Content Skeleton */}
      <main className="py-12 sm:py-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left - Course Info (3 columns) */}
            <div className="lg:col-span-3 space-y-10">
              {/* Image Skeleton */}
              <Skeleton className="aspect-video rounded-3xl" />

              {/* Title Skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
              </div>

              {/* What You'll Learn Skeleton */}
              <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border-2 border-blue-100">
                <Skeleton className="h-8 w-64 mb-6" />
                <div className="grid sm:grid-cols-2 gap-4">
                  {[1,2,3,4,5,6].map(i => (
                    <Skeleton key={i} className="h-12" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Purchase Card (2 columns) */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-white rounded-3xl border-4 border-white shadow-2xl overflow-hidden">
                {/* Price Header Skeleton */}
                <div className="p-8 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600">
                  <Skeleton className="h-12 w-48 bg-white/20" />
                  <Skeleton className="h-5 w-full bg-white/10 mt-2" />
                </div>

                {/* Form Skeleton */}
                <div className="p-8 space-y-6">
                  {[1,2,3].map(i => (
                    <div key={i}>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-14 w-full" />
                    </div>
                  ))}
                  <Skeleton className="h-14 w-full" />
                </div>

                {/* What's Included Skeleton */}
                <div className="px-8 pb-8 space-y-3 border-t-2 border-neutral-100 pt-6">
                  <Skeleton className="h-5 w-48 mb-4" />
                  {[1,2,3,4,5,6].map(i => (
                    <Skeleton key={i} className="h-8" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Page Loading with spinner
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" shimmer />
          <Skeleton className="h-6 w-96" shimmer />
        </div>
        <CoursesGridSkeleton count={6} />
      </div>
    </div>
  );
}

// Loading Spinner Component
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin`} 
           role="status"
           aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}