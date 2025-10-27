// app/page.tsx - Mobile-First Landing Page dengan GSAP Animations (FIXED)
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Register GSAP plugins once on client
    gsap.registerPlugin(ScrollTrigger);

    // Navbar scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      // Hero animations - stagger fade in
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('.hero-animate');
        if (heroElements.length > 0) {
          gsap.from(heroElements, {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.2,
            clearProps: 'all', // Clear inline styles after animation
          });
        }
      }

      // Stats animated numbers
      if (statsRef.current) {
        const stats = statsRef.current.querySelectorAll('.stat-number');
        
        stats.forEach((stat) => {
          const target = stat.textContent || '0';
          const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
          
          if (!isNaN(numericValue) && numericValue > 0) {
            gsap.from(stat, {
              textContent: 0,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true, // Only animate once
              },
              onUpdate: function() {
                const current = Math.round(Number(this.targets()[0].textContent));
                const formattedNumber = current.toLocaleString();
                
                if (target.includes('+')) {
                  (this.targets()[0] as HTMLElement).textContent = formattedNumber + '+';
                } else if (target.includes('/')) {
                  (this.targets()[0] as HTMLElement).textContent = current.toFixed(1) + '/5';
                } else if (target.includes('24/7')) {
                  (this.targets()[0] as HTMLElement).textContent = '24/7';
                } else {
                  (this.targets()[0] as HTMLElement).textContent = formattedNumber;
                }
              },
            });
          }
        });
      }

      // Features stagger animation
      if (featuresRef.current) {
        const featureCards = featuresRef.current.querySelectorAll('.feature-card');
        
        if (featureCards.length > 0) {
          gsap.from(featureCards, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
              once: true, // Only animate once
            },
            clearProps: 'all',
          });
        }
      }

      // Parallax effect for background
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach((el) => {
        gsap.to(el, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  // Close mobile menu on route change
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Don't render GSAP animations on server
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
        {/* Simple loading state or minimal content */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-600 font-semibold">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-neutral-200/50' 
          : 'bg-white/90 backdrop-blur-xl border-b border-neutral-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className={`relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                  scrolled ? 'shadow-blue-500/30' : 'shadow-blue-500/20'
                } group-hover:shadow-blue-500/40 group-hover:scale-110`}>
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              </div>
              <span className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 tracking-tight">
                <span className="hidden sm:inline">Radio Online Academy</span>
                <span className="sm:hidden">ROA</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#features" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                How It Works
              </a>
              <Link 
                href="/courses"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-all btn-hover-lift"
              >
                Lihat Courses
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors"
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

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-neutral-200 shadow-xl transition-all duration-300 ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <a 
              href="#features"
              onClick={closeMobileMenu}
              className="block py-3 px-4 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
            >
              Features
            </a>
            <a 
              href="#how-it-works"
              onClick={closeMobileMenu}
              className="block py-3 px-4 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all"
            >
              How It Works
            </a>
            <div className="pt-2">
              <Link 
                href="/courses"
                onClick={closeMobileMenu}
                className="block py-3 px-4 text-base font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-all text-center"
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

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradients dengan Parallax */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="parallax-bg absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="parallax-bg absolute bottom-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="hero-animate inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 border border-blue-200 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-semibold text-blue-700">Platform #1 Radio Online</span>
              </div>

              <div className="space-y-4">
                <h1 className="hero-animate text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
                  Bangun Radio Online{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Profesional
                  </span>
                </h1>
                <p className="hero-animate text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Dari setup server, streaming, hingga monetisasi. Pelajari semua yang kamu butuhkan untuk membangun radio online yang sukses.
                </p>
              </div>

              <div className="hero-animate flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-neutral-900 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-neutral-800 transition-all btn-hover-lift shadow-xl"
                >
                  <span>Mulai Belajar</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-neutral-900 text-sm sm:text-base font-semibold rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Lihat Preview</span>
                </a>
              </div>

              {/* Social Proof */}
              <div className="hero-animate flex items-center gap-6 pt-4 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      {i}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-neutral-600 text-xs font-bold">
                    +1K
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-neutral-900">1,200+ Students</div>
                  <div className="text-neutral-600">sudah bergabung</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hero-animate relative">
              <div className="relative z-10 bg-white rounded-2xl lg:rounded-3xl shadow-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
                {/* Live Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-neutral-900">Now Streaming</span>
                  </div>
                  <span className="text-sm text-neutral-500">24/7 Live</span>
                </div>

                {/* Waveform */}
                <div className="flex items-end justify-center gap-1.5 h-32">
                  {[8, 16, 12, 20, 14, 24, 18, 10, 22, 16, 12, 18, 14, 20, 16].map((height, i) => (
                    <div
                      key={i}
                      className="w-2 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full"
                      style={{
                        height: `${height * 3}px`,
                        animation: `pulse ${1 + i * 0.1}s ease-in-out infinite alternate`
                      }}
                    />
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-2xl">
                    <div className="text-3xl font-bold text-blue-600">500+</div>
                    <div className="text-xs text-neutral-600 mt-1">Active Radios</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-2xl">
                    <div className="text-3xl font-bold text-green-600">94%</div>
                    <div className="text-xs text-neutral-600 mt-1">Success Rate</div>
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

      {/* Stats Banner */}
      <section ref={statsRef} className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: '1200', label: 'Students', suffix: '+' },
              { number: '500', label: 'Active Radios', suffix: '+' },
              { number: '4.9', label: 'Rating', suffix: '/5' },
              { number: '24/7', label: 'Support', suffix: '' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="stat-number text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
              <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-semibold text-neutral-700">Complete Learning Path</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              Semua yang Kamu Butuhkan
            </h2>
            <p className="text-base sm:text-lg text-neutral-600">
              Dari nol hingga profesional, panduan lengkap step-by-step
            </p>
          </div>

          {/* Features Grid */}
          <div ref={featuresRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Server & Infrastructure',
                desc: 'Setup VPS, konfigurasi streaming server, dan optimize untuk performa maksimal'
              },
              {
                title: 'Audio Technology',
                desc: 'Protokol streaming, codec audio, bitrate optimization untuk broadcast quality'
              },
              {
                title: 'Broadcasting Software',
                desc: 'Mastering BUTT, SAM Broadcaster, RadioDJ, dan software profesional lainnya'
              },
              {
                title: 'Automation & Scheduling',
                desc: 'Setup automasi 24/7, playlist management, dan scheduling program'
              },
              {
                title: 'Web & Mobile',
                desc: 'Integrasi player, mobile app, dan distribusi ke TuneIn, Radio.net'
              },
              {
                title: 'Monetization',
                desc: 'Strategi iklan audio, subscription, sponsorship, dan analytics'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card group p-6 sm:p-8 bg-white rounded-2xl lg:rounded-3xl border border-neutral-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              Cara Kerja Pembelajaran
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Proses belajar yang terstruktur dan mudah diikuti
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 relative">
            {/* Connecting Line - Hidden on Mobile */}
            <div className="hidden sm:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -z-10"></div>

            {[
              { step: '01', title: 'Pilih Course', desc: 'Browse dan pilih course sesuai tujuan kamu' },
              { step: '02', title: 'Akses Materi', desc: 'Pelajari video, dokumentasi, dan praktek' },
              { step: '03', title: 'Launch Radio', desc: 'Terapkan ilmu dan launch radio online' },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-4 border-blue-500 rounded-full mb-6 text-2xl font-bold text-blue-600 relative z-10 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-base text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Siap Membangun Radio Online-mu?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto">
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
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="text-base font-bold text-neutral-900">Radio Online Academy</span>
            </div>
            <div className="text-sm text-neutral-500 text-center sm:text-left">
              © 2024 Radio Online Academy. Powered by Scalev.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}