// app/page.tsx - Mobile-First, Highly Polished Landing Page
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Smooth scroll reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.observe-section');
    sections.forEach(section => observer.observe(section));

    // Scroll detection for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-neutral-200/50' 
          : 'bg-white/90 backdrop-blur-xl border-b border-neutral-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo - Enhanced */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group touch-manipulation relative z-50">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 ${
                scrolled ? 'shadow-blue-500/30' : 'shadow-blue-500/20'
              } group-hover:shadow-blue-500/40 group-hover:scale-110`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="text-sm sm:text-base lg:text-lg font-bold text-neutral-900 tracking-tight group-hover:text-blue-600 transition-colors">
                <span className="hidden sm:inline">Radio Online Academy</span>
                <span className="sm:hidden">ROA</span>
              </span>
            </Link>

            {/* Desktop Navigation - Enhanced */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a 
                href="#features" 
                className="relative text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors touch-manipulation group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <a 
                href="#how-it-works" 
                className="relative text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors touch-manipulation group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
              <Link 
                href="/courses"
                className="group relative px-4 lg:px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 rounded-lg overflow-hidden transition-all btn-hover-lift touch-manipulation"
              >
                <span className="relative z-10">Lihat Courses</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors touch-manipulation z-50"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-neutral-200 shadow-xl transition-all duration-300 ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <a 
              href="#features"
              onClick={closeMobileMenu}
              className="block py-3 px-4 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all touch-manipulation"
            >
              Features
            </a>
            <a 
              href="#how-it-works"
              onClick={closeMobileMenu}
              className="block py-3 px-4 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all touch-manipulation"
            >
              How It Works
            </a>
            <div className="pt-2">
              <Link 
                href="/courses"
                onClick={closeMobileMenu}
                className="block py-3 px-4 text-base font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-all text-center touch-manipulation"
              >
                Lihat Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={closeMobileMenu}
          ></div>
        )}
      </nav>

      {/* Hero Section - Mobile Optimized */}
      <section ref={heroRef} className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradients - Reduced on mobile */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Content - Mobile First */}
            <div className="space-y-5 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 border border-blue-200 rounded-full text-xs sm:text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-blue-700">Platform #1 Radio Online</span>
              </div>

              {/* Heading - Responsive Typography */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
                  Bangun Radio Online{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Profesional
                  </span>
                </h1>
                <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Dari setup server, streaming, hingga monetisasi. Pelajari semua yang kamu butuhkan untuk membangun radio online yang sukses.
                </p>
              </div>

              {/* CTAs - Stack on Mobile */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-neutral-900 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-neutral-800 active:scale-98 transition-all btn-hover-lift shadow-xl shadow-neutral-900/10 touch-manipulation"
                >
                  <span>Mulai Belajar</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-white text-neutral-900 text-sm sm:text-base font-semibold rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 active:scale-98 transition-all touch-manipulation"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Lihat Preview</span>
                </a>
              </div>

              {/* Social Proof - Compact on Mobile */}
              <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 pt-3 sm:pt-4 lg:pt-6 justify-center lg:justify-start">
                <div className="flex -space-x-2 sm:-space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shadow-lg">
                      {i}
                    </div>
                  ))}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-neutral-600 text-[10px] sm:text-xs font-bold">
                    +1K
                  </div>
                </div>
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold text-neutral-900">1,200+ Students</div>
                  <div className="text-neutral-600">sudah bergabung</div>
                </div>
              </div>
            </div>

            {/* Visual Card - Now Visible on Mobile! */}
            <div className="relative animate-slide-up stagger-1">
              <div className="relative z-10 bg-white rounded-2xl lg:rounded-3xl shadow-2xl border border-neutral-200 p-5 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 lg:space-y-6">
                {/* Live Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900">Now Streaming</span>
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-500">24/7 Live</span>
                </div>

                {/* Waveform - Responsive */}
                <div className="flex items-end justify-center gap-1 sm:gap-1.5 h-24 sm:h-28 lg:h-32">
                  {[8, 16, 12, 20, 14, 24, 18, 10, 22, 16, 12, 18, 14, 20, 16].map((height, i) => (
                    <div
                      key={i}
                      className="w-1.5 sm:w-2 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full transition-all"
                      style={{
                        height: `${height * 3}px`,
                        animation: `pulse ${1 + i * 0.1}s ease-in-out infinite alternate`
                      }}
                    />
                  ))}
                </div>

                {/* Stats - Responsive Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-blue-50 rounded-xl lg:rounded-2xl">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">500+</div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-neutral-600 mt-0.5 sm:mt-1">Active Radios</div>
                  </div>
                  <div className="p-3 sm:p-4 bg-green-50 rounded-xl lg:rounded-2xl">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">94%</div>
                    <div className="text-[10px] sm:text-xs lg:text-sm text-neutral-600 mt-0.5 sm:mt-1">Success Rate</div>
                  </div>
                </div>

                {/* Tech Stack - Responsive */}
                <div className="pt-3 sm:pt-4 border-t border-neutral-100">
                  <div className="text-[10px] sm:text-xs text-neutral-500 mb-2 sm:mb-3">Tech Stack:</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {['Icecast', 'Shoutcast', 'BUTT', 'Azuracast', 'OBS'].map(tech => (
                      <span key={tech} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-neutral-100 text-neutral-700 text-[10px] sm:text-xs font-medium rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile Only: Quick Stats */}
                <div className="lg:hidden pt-3 border-t border-neutral-100">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-base sm:text-lg font-bold text-neutral-900">1.2K+</div>
                      <div className="text-[10px] sm:text-xs text-neutral-600">Students</div>
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold text-neutral-900">4.9</div>
                      <div className="text-[10px] sm:text-xs text-neutral-600">Rating</div>
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold text-neutral-900">24/7</div>
                      <div className="text-[10px] sm:text-xs text-neutral-600">Support</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements - Subtle on Mobile */}
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl sm:rounded-3xl opacity-10 sm:opacity-20 blur-2xl -z-10"></div>
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl sm:rounded-3xl opacity-10 sm:opacity-20 blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner - Mobile Optimized */}
      <section ref={statsRef} className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { number: '1,200+', label: 'Students' },
              { number: '500+', label: 'Active Radios' },
              { number: '4.9/5', label: 'Rating' },
              { number: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="text-center observe-section">
                <div className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Mobile Optimized Grid */}
      <section id="features" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4 max-w-3xl mx-auto observe-section">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-neutral-100 rounded-full">
              <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-neutral-700">Complete Learning Path</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight px-4">
              Semua yang Kamu Butuhkan
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 px-4">
              Dari nol hingga profesional, panduan lengkap step-by-step
            </p>
          </div>

          {/* Features Grid - Responsive */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                ),
                title: 'Server & Infrastructure',
                description: 'Setup VPS, konfigurasi streaming server, dan optimize untuk performa maksimal'
              },
              {
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ),
                title: 'Audio Technology',
                description: 'Protokol streaming, codec audio, bitrate optimization untuk broadcast quality'
              },
              {
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ),
                title: 'Broadcasting Software',
                description: 'Mastering BUTT, SAM Broadcaster, RadioDJ, dan software profesional lainnya'
              },
              {
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                ),
                title: 'Automation & Scheduling',
                description: 'Setup automasi 24/7, playlist management, dan scheduling program'
              },
              {
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                title: 'Web & Mobile',
                description: 'Integrasi player, mobile app, dan distribusi ke TuneIn, Radio.net'
              },
              {
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Monetization',
                description: 'Strategi iklan audio, subscription, sponsorship, dan analytics'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-5 sm:p-6 lg:p-8 bg-white rounded-2xl lg:rounded-3xl border border-neutral-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 observe-section touch-manipulation"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-2xl lg:rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Mobile Optimized */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4 observe-section">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight px-4">
              Cara Kerja Pembelajaran
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
              Proses belajar yang terstruktur dan mudah diikuti
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Connecting Line - Hidden on Mobile */}
            <div className="hidden sm:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -z-10"></div>

            {[
              { step: '01', title: 'Pilih Course', desc: 'Browse dan pilih course sesuai tujuan kamu' },
              { step: '02', title: 'Akses Materi', desc: 'Pelajari video, dokumentasi, dan praktek' },
              { step: '03', title: 'Launch Radio', desc: 'Terapkan ilmu dan launch radio online' },
            ].map((item, i) => (
              <div key={i} className="relative text-center observe-section" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white border-4 border-blue-500 rounded-full mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-blue-600 relative z-10 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-neutral-600 px-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10 observe-section">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight px-4">
            Siap Membangun Radio Online-mu?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto px-4">
            Bergabung dengan 1,200+ kreator yang sudah sukses membangun radio online mereka
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-neutral-900 text-sm sm:text-base font-semibold rounded-lg hover:bg-neutral-100 active:scale-98 transition-all btn-hover-lift shadow-2xl touch-manipulation"
          >
            <span>Mulai Belajar Sekarang</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer - Compact on Mobile */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="text-sm sm:text-base lg:text-lg font-bold text-neutral-900">Radio Online Academy</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 text-center sm:text-left">
              © 2024 Radio Online Academy. Powered by Scalev.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}