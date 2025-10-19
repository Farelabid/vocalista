// app/page.tsx - Modern Landing Page
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center backdrop-blur-sm bg-white/5 rounded-2xl px-6 py-4 border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎙️</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Vocalista
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/courses" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                Courses
              </Link>
              <Link 
                href="/dashboard" 
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-slate-300">Platform pembelajaran audio #1 di Indonesia</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Master Your Voice,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Master Your Craft
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Platform pembelajaran terlengkap untuk kreator audio. 
              Dari voice over, podcast production, hingga audio editing profesional.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/courses"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Mulai Belajar Sekarang
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <button className="px-8 py-4 backdrop-blur-sm bg-white/10 text-white text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                Lihat Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">1000+</div>
                <div className="text-slate-400 text-sm">Student Aktif</div>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-slate-400 text-sm">Video Pembelajaran</div>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">4.9</div>
                <div className="text-slate-400 text-sm">Rating Rata-rata</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Kenapa Pilih Vocalista?
            </h3>
            <p className="text-slate-400 text-lg">
              Platform lengkap untuk meningkatkan skill audio kamu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎙️</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Voice Over Mastery</h3>
              <p className="text-slate-400 leading-relaxed">
                Teknik voice acting profesional untuk berbagai media, dari iklan hingga audiobook
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎧</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Podcast Production</h3>
              <p className="text-slate-400 leading-relaxed">
                Dari recording hingga publishing podcast berkualitas tinggi yang engaging
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎚️</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Audio Editing Pro</h3>
              <p className="text-slate-400 leading-relaxed">
                Menguasai tools dan teknik editing audio level profesional dengan workflow efisien
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="backdrop-blur-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl p-12 border border-white/10 text-center">
            <h3 className="text-4xl font-bold text-white mb-4">
              Siap Meningkatkan Skill Audio Kamu?
            </h3>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Bergabung dengan ribuan kreator yang sudah memulai journey mereka bersama Vocalista
            </p>
            <Link
              href="/courses"
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              Lihat Semua Courses →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-white/10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎙️</span>
              </div>
              <span className="text-xl font-bold text-white">Vocalista</span>
            </div>
            <p className="text-slate-400">
              Platform pembelajaran audio terbaik untuk kreator Indonesia
            </p>
            <p className="text-slate-500 text-sm mt-4">
              © 2024 Vocalista. Powered by Scalev.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}