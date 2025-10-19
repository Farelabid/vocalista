// app/courses/page.tsx
import CourseCard from '@/components/CourseCard';
import Link from 'next/link';
import { Course } from '@/lib/types';

async function getCourses(): Promise<Course[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/courses`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch courses');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-md bg-slate-900/50 border-b border-slate-800/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🎙️</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Vocalista
                </h1>
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  Dashboard
                </Link>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h1 className="text-5xl font-bold text-white">
                Katalog Courses
              </h1>
            </div>
            <p className="text-slate-400 text-lg ml-3">
              Pilih course yang sesuai dengan tujuan pembelajaran kamu
            </p>

            {/* Filter/Sort Bar */}
            <div className="flex flex-wrap gap-3 mt-8 ml-3">
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                Semua Courses
              </button>
              <button className="px-6 py-2.5 backdrop-blur-sm bg-white/5 text-slate-300 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors border border-white/10">
                Voice Over
              </button>
              <button className="px-6 py-2.5 backdrop-blur-sm bg-white/5 text-slate-300 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors border border-white/10">
                Podcast
              </button>
              <button className="px-6 py-2.5 backdrop-blur-sm bg-white/5 text-slate-300 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors border border-white/10">
                Audio Editing
              </button>
              
              <div className="ml-auto">
                <select className="px-4 py-2.5 backdrop-blur-sm bg-white/5 text-slate-300 rounded-xl text-sm border border-white/10 focus:outline-none focus:border-blue-500">
                  <option>Paling Populer</option>
                  <option>Harga Terendah</option>
                  <option>Harga Tertinggi</option>
                  <option>Terbaru</option>
                </select>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          {courses.length > 0 ? (
            <>
              {/* Stats */}
              <div className="mb-8 ml-3">
                <p className="text-slate-400">
                  Menampilkan <span className="text-white font-semibold">{courses.length}</span> courses
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <div
                    key={course.variant_unique_id}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl opacity-50">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Belum ada course tersedia
              </h3>
              <p className="text-slate-400 mb-6">
                Kami sedang menyiapkan konten terbaik untuk kamu
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Kembali ke Home
              </Link>
            </div>
          )}

          {/* Load More (untuk future pagination) */}
          {courses.length > 0 && (
            <div className="mt-12 text-center">
              <button className="px-8 py-3 backdrop-blur-sm bg-white/5 text-white rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                Load More Courses
              </button>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export const revalidate = 300;