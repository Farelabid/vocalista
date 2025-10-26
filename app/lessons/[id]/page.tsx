// app/page.tsx - Radio Online Academy Landing (No Dashboard)
import Link from 'next/link';

export default function Home() {
  
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-neutral-900 tracking-tight">
                Radio Online Academy
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/#features" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Features
              </Link>
              <Link href="/#about" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                About
              </Link>
              <Link 
                href="/courses"
                className="px-4 py-2 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-all btn-hover-lift"
              >
                Lihat Courses
              </Link>
            </div>

            <button className="md:hidden p-2 text-neutral-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-right">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-blue-700">Platform Pembelajaran Radio Online</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 leading-[1.1] tracking-tight text-balance">
                  Bangun Radio Online Profesional
                </h1>
                <p className="text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-xl">
                  Pelajari cara membangun dan mengelola radio online dari nol. 
                  Dari setup teknis, streaming, hingga manajemen konten dan monetisasi.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-all btn-hover-lift"
                >
                  <span>Mulai Belajar</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 text-sm font-semibold rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                >
                  <span>Pelajari Lebih Lanjut</span>
                </a>
              </div>
            </div>

            <div className="relative animate-slide-up stagger-1">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl shadow-neutral-900/10 border border-neutral-200 p-8 space-y-6">
                {/* Audio Waveform Visualization */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-12 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-6 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-16 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-2 h-10 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  <div className="w-2 h-14 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-8 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-neutral-900">Setup Teknis</div>
                        <div className="text-xs text-neutral-500">Server, streaming, encoding</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-neutral-900">Audio Production</div>
                        <div className="text-xs text-neutral-500">Mixing, mastering, processing</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-neutral-900">Monetisasi</div>
                        <div className="text-xs text-neutral-500">Iklan, subscription, sponsorship</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-xl opacity-10 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-full">
              <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-semibold text-neutral-700">Yang Akan Kamu Pelajari</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              Kuasai Semua Aspek Radio Online
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Dari setup server hingga monetisasi, semua yang kamu butuhkan untuk sukses di industri radio online
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
                title: 'Server & Hosting Setup',
                description: 'Pilih dan konfigurasi server yang tepat, setup hosting optimal, dan infrastruktur streaming yang handal'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ),
                title: 'Streaming Technology',
                description: 'Protokol streaming (Icecast, Shoutcast), encoding audio, bitrate optimization untuk kualitas maksimal'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ),
                title: 'Audio Production',
                description: 'Recording studio setup, mixing & mastering techniques, audio processing untuk broadcast quality'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                ),
                title: 'Playlist Management',
                description: 'Automasi playlist 24/7, scheduling program, rotasi musik, dan manajemen library audio'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                title: 'Website & Mobile Integration',
                description: 'Integrasi player ke website, mobile app development, dan distribusi ke platform streaming populer'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Monetization Strategy',
                description: 'Strategi monetisasi: iklan audio, subscription model, sponsorship deals, dan merchandise'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-neutral-50 rounded-2xl hover:bg-white hover:shadow-lg border border-transparent hover:border-neutral-200 transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why Choose Us */}
      <section id="about" className="py-20 px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-slide-right">
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                Kenapa Memilih Radio Online Academy?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">Materi Praktis & Langsung Praktek</h3>
                    <p className="text-neutral-600">Bukan hanya teori, tapi langsung hands-on dengan case study real-world</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">Mentor Berpengalaman</h3>
                    <p className="text-neutral-600">Belajar dari praktisi yang sudah mengelola radio online sukses</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">Akses Seumur Hidup</h3>
                    <p className="text-neutral-600">Beli sekali, akses selamanya. Termasuk semua update materi terbaru</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up stagger-1">
              <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                    <span className="text-neutral-600">Total Students</span>
                    <span className="text-2xl font-bold text-neutral-900">1,200+</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                    <span className="text-neutral-600">Success Rate</span>
                    <span className="text-2xl font-bold text-green-600">94%</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                    <span className="text-neutral-600">Active Radios</span>
                    <span className="text-2xl font-bold text-blue-600">500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">Average Rating</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-yellow-600">4.9</span>
                      <div className="flex">
                        {[1,2,3,4,5].map(i => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Siap Membangun Radio Online-mu?
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Dapatkan panduan lengkap dari setup hingga monetisasi radio online profesional
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 text-sm font-semibold rounded-lg hover:bg-neutral-100 transition-all btn-hover-lift"
            >
              <span>Lihat Semua Courses</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
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