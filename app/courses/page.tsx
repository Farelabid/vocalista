// app/courses/page.tsx - Enhanced Courses Page
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
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-neutral-900 tracking-tight">
                Radio Online Academy
              </span>
            </Link>

            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Kembali ke Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative py-20 px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50/30 to-white border-b border-neutral-200 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-6 animate-slide-up">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-neutral-900 font-medium">Courses</span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight">
                Course Radio Online
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Pilih course yang sesuai dengan level dan tujuan pembelajaran kamu. Dari pemula hingga advanced.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{courses.length} Courses</div>
                  <div className="text-xs text-neutral-500">Available now</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">Akses Lifetime</div>
                  <div className="text-xs text-neutral-500">Beli sekali, akses selamanya</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900">4.9 Rating</div>
                  <div className="text-xs text-neutral-500">Dari 1,200+ students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {courses.length > 0 ? (
            <>
              {/* Section Header */}
              <div className="mb-12 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">Semua Courses</h2>
                  <p className="text-neutral-600">
                    Menampilkan {courses.length} course{courses.length > 1 ? 's' : ''} tersedia
                  </p>
                </div>

                {/* Sort Dropdown */}
                <select className="px-4 py-2.5 bg-white text-neutral-900 text-sm font-medium rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer">
                  <option>Terbaru</option>
                  <option>Paling Populer</option>
                  <option>Harga: Rendah ke Tinggi</option>
                  <option>Harga: Tinggi ke Rendah</option>
                </select>
              </div>

              {/* Courses Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <div
                    key={course.variant_unique_id}
                    className="animate-slide-up"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>

              {/* CTA Banner */}
              <div className="mt-16 p-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJ6bTAgNGgyczJ2MmgtMnptLTJ2Mmgydi0yaC0yem0tMiAyaDJ2LTJoLTJ6bTIgMmgydi0yaC0yem0yIDJ2LTJoLTJ2Mmgyem0yLTJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0yLTJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0tMi0ydjJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                  <h3 className="text-2xl font-bold">Butuh Bantuan Memilih Course?</h3>
                  <p className="text-blue-100">
                    Hubungi kami untuk konsultasi gratis dan rekomendasi course yang sesuai dengan tujuan kamu
                  </p>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all mt-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Konsultasi Sekarang</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-24 animate-scale-in">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-neutral-100 rounded-3xl mb-8">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-neutral-900 mb-3">
                Belum Ada Course Tersedia
              </h3>
              <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
                Course sedang dalam tahap persiapan. Kami akan segera menghadirkan konten berkualitas untuk kamu.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white text-base font-semibold rounded-lg hover:bg-neutral-800 transition-all btn-hover-lift"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Kembali ke Home</span>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-sm text-neutral-500">
            © 2024 Radio Online Academy. Powered by Scalev.
          </div>
        </div>
      </footer>
    </div>
  );
}

export const revalidate = 300;