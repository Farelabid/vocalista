// components/Skeleton.tsx - Enhanced with shimmer
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
        shimmer ? 'skeleton-shimmer' : 'animate-pulse'
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