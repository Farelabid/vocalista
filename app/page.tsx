// app/page.tsx - Enhanced Landing Page
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation - Mobile Optimized */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Mobile Friendly */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                <span className="hidden sm:inline">Radio Online Academy</span>
                <span className="sm:hidden">ROA</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#features" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                How It Works
              </a>
              <Link 
                href="/courses"
                className="px-4 py-2 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-all btn-hover-lift"
              >
                Lihat Courses
              </Link>
            </div>

            {/* Mobile CTA Button */}
            <Link 
              href="/courses"
              className="md:hidden px-4 py-2 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-all"
            >
              Courses
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Mobile Optimized */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content - Mobile First */}
            <div className="space-y-6 sm:space-y-8 animate-slide-right text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 border border-blue-200 rounded-full text-xs sm:text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-blue-700">Platform #1 untuk Kreator Radio Online</span>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
                  Bangun Radio Online{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Profesional
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Dari setup server, streaming, hingga monetisasi. Pelajari semua yang kamu butuhkan untuk membangun radio online yang sukses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-neutral-900 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-neutral-800 transition-all btn-hover-lift shadow-xl shadow-neutral-900/10 touch-manipulation"
                >
                  <span>Mulai Belajar Sekarang</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-neutral-900 text-sm sm:text-base font-semibold rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all touch-manipulation"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Lihat Preview</span>
                </a>
              </div>

              {/* Social Proof - Mobile Adjusted */}
              <div className="flex items-center gap-6 sm:gap-8 pt-4 sm:pt-6 justify-center lg:justify-start">
                <div className="flex -space-x-2 sm:-space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {i}
                    </div>
                  ))}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-neutral-600 text-xs font-bold">
                    +1K
                  </div>
                </div>
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold text-neutral-900">1,200+ Students</div>
                  <div className="text-neutral-600">sudah bergabung</div>
                </div>
              </div>
            </div>

            {/* Right - Visual Card - Hidden on Mobile, Shown on Tablet+ */}
            <div className="relative animate-slide-up stagger-1 hidden lg:block">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
                {/* Live Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-neutral-900">Now Streaming</span>
                  </div>
                  <span className="text-sm text-neutral-500">24/7 Live</span>
                </div>

                {/* Waveform */}
                <div className="flex items-end justify-center gap-1.5 h-32 mb-6">
                  {[8, 16, 12, 20, 14, 24, 18, 10, 22, 16, 12, 18, 14, 20, 16].map((height, i) => (
                    <div
                      key={i}
                      className="w-2 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full transition-all"
                      style={{
                        height: `${height * 4}px`,
                        animation: `pulse ${1 + i * 0.1}s ease-in-out infinite alternate`
                      }}
                    />
                  ))}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-2xl">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">500+</div>
                    <div className="text-xs sm:text-sm text-neutral-600 mt-1">Active Radios</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-2xl">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600">94%</div>
                    <div className="text-xs sm:text-sm text-neutral-600 mt-1">Success Rate</div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="pt-4 border-t border-neutral-100">
                  <div className="text-xs text-neutral-500 mb-3">Tech Stack:</div>
                  <div className="flex flex-wrap gap-2">
                    {['Icecast', 'Shoutcast', 'BUTT', 'Azuracast', 'OBS'].map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl opacity-20 blur-2xl -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-600 rounded-3xl opacity-20 blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner - Mobile Optimized */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { number: '1,200+', label: 'Students' },
              { number: '500+', label: 'Active Radios' },
              { number: '4.9/5', label: 'Rating' },
              { number: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
              <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-semibold text-neutral-700">Complete Learning Path</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              Semua yang Kamu Butuhkan untuk Sukses
            </h2>
            <p className="text-lg text-neutral-600">
              Dari nol hingga profesional, panduan lengkap step-by-step
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                ),
                title: 'Server & Infrastructure',
                description: 'Setup VPS, konfigurasi streaming server (Icecast/Shoutcast), dan optimize untuk performa maksimal'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ),
                title: 'Audio Technology',
                description: 'Protokol streaming, codec audio, bitrate optimization, dan audio processing untuk broadcast quality'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ),
                title: 'Broadcasting Software',
                description: 'Mastering BUTT, SAM Broadcaster, RadioDJ, dan software broadcasting profesional lainnya'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                ),
                title: 'Automation & Scheduling',
                description: 'Setup automasi 24/7, playlist management, rotasi musik, dan scheduling program radio'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                title: 'Web & Mobile Integration',
                description: 'Integrasi player ke website, mobile app development, dan distribusi ke TuneIn, Radio.net'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Monetization & Growth',
                description: 'Strategi iklan audio, subscription model, sponsorship deals, merchandise, dan analytics'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white rounded-3xl border border-neutral-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              Cara Kerja Pembelajaran
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Proses belajar yang terstruktur dan mudah diikuti
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -translate-y-1/2 -z-10"></div>

            {[
              { step: '01', title: 'Pilih Course', desc: 'Browse dan pilih course yang sesuai dengan tujuan kamu' },
              { step: '02', title: 'Akses Materi', desc: 'Pelajari materi video, dokumentasi, dan hands-on practice' },
              { step: '03', title: 'Launch Radio', desc: 'Terapkan ilmu dan launch radio online kamu sendiri' },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-4 border-blue-500 rounded-full mb-6 text-2xl font-bold text-blue-600 relative z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Siap Membangun Radio Online-mu?
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Bergabung dengan 1,200+ kreator yang sudah sukses membangun radio online mereka
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 text-base font-semibold rounded-lg hover:bg-neutral-100 transition-all btn-hover-lift shadow-2xl"
          >
            <span>Mulai Belajar Sekarang</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-neutral-900">Radio Online Academy</span>
            </div>
            <div className="text-sm text-neutral-500">
              © 2024 Radio Online Academy. Powered by Scalev.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}