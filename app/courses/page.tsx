// app/courses/page.tsx - Courses Listing dengan font yang lebih ringan
import CourseCard from '@/components/CourseCard';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { Course } from '@/lib/types';
import { CoursesGridSkeleton } from '@/components/Skeletons';
import { Suspense } from 'react';

async function getCourses(): Promise<Course[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/courses`, {
      cache: 'no-store',
      next: { revalidate: 300 }
    });

    if (!res.ok) {
      console.error(`Failed to fetch courses: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
      {/* Navigation */}
      <Navigation currentPage="courses" />

      {/* Hero Header */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-neutral-600 justify-center lg:justify-start">
              <Link
              href="/"
              className="flex items-center hover:text-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded py-1 px-2"
              >
              Home
              </Link>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
              <span className="flex items-center text-neutral-900 font-semibold py-1 px-2">Courses</span>
            </nav>

            {/* Title */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none tracking-tight">
                <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
                  Katalog Course
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 blur-2xl opacity-30"></span>
                  <span className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Radio Online
                  </span>
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                Pilih course yang sesuai dengan level dan tujuan kamu. Dari <span className="font-semibold text-neutral-900">pemula</span> hingga <span className="font-semibold text-neutral-900">advanced</span>.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-3 px-4 sm:px-5 lg:px-6 py-3 sm:py-4 bg-white rounded-2xl border-2 border-neutral-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{courses.length} Courses</div>
                  <div className="text-xs font-medium text-neutral-500">Tersedia Sekarang</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 sm:px-5 lg:px-6 py-3 sm:py-4 bg-white rounded-2xl border-2 border-neutral-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">Lifetime Access</div>
                  <div className="text-xs font-medium text-neutral-500 hidden sm:block">Beli Sekali, Akses Selamanya</div>
                  <div className="text-xs font-medium text-neutral-500 sm:hidden">Akses Selamanya</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 sm:px-5 lg:px-6 py-3 sm:py-4 bg-white rounded-2xl border-2 border-neutral-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">4.9 Rating</div>
                  <div className="text-xs font-medium text-neutral-500">1,200+ Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {courses.length > 0 ? (
            <>
              {/* Section Header */}
              <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">Semua Courses</h2>
                  <p className="text-sm sm:text-base text-neutral-600 font-medium">
                    Menampilkan <span className="text-blue-600 font-semibold">{courses.length}</span> course tersedia
                  </p>
                </div>

                {/* Sort Dropdown */}
                <select
                  className="px-5 sm:px-6 py-3 bg-white text-neutral-900 text-sm font-medium rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:border-neutral-300"
                  aria-label="Sort courses"
                >
                  <option>✨ Terbaru</option>
                  <option>🔥 Paling Populer</option>
                  <option>💰 Harga: Rendah → Tinggi</option>
                  <option>💎 Harga: Tinggi → Rendah</option>
                </select>
              </div>

              {/* Courses Grid */}
              <Suspense fallback={<CoursesGridSkeleton count={courses.length} />}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                  {courses.map((course, index) => (
                    <div
                      key={course.variant_unique_id}
                      className="animate-fade-in-up"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'both'
                      }}
                    >
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </Suspense>

              {/* CTA Banner */}
              <div className="mt-16 sm:mt-20 relative p-8 sm:p-10 lg:p-16 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl text-white overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

                <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
                  <div className="text-4xl sm:text-5xl mb-4" aria-hidden="true">🤔</div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Butuh Bantuan Memilih?</h3>
                  <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed">
                    Konsultasi <span className="font-bold text-white">GRATIS</span> dengan mentor kami untuk rekomendasi course yang sesuai dengan tujuan kamu
                  </p>
                  <button
                    className="inline-flex items-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-white text-blue-600 font-semibold text-base sm:text-lg rounded-2xl hover:bg-blue-50 shadow-2xl hover:shadow-white/20 transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-4 focus:ring-offset-blue-600 mt-4"
                    aria-label="Chat dengan mentor untuk konsultasi gratis"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Chat Dengan Mentor</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-24 sm:py-32 animate-scale-in">
              <div className="text-6xl sm:text-8xl mb-6" aria-hidden="true">🎓</div>
              <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mb-8 shadow-2xl">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                Course Segera Hadir
              </h2>
              <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-lg mx-auto leading-relaxed">
                Kami sedang mempersiapkan konten berkualitas tinggi untuk kamu. Stay tuned! 🚀
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base sm:text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Kembali ke Home</span>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold">Radio Online Academy</span>
          </div>
          <div className="text-sm text-neutral-400 font-medium">
            © 2024 Radio Online Academy. Powered by Scalev.
          </div>
        </div>
      </footer>
    </div>
  );
}

export const revalidate = 300;