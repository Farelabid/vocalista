/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavigationProps {
  currentPage?: 'home' | 'courses' | 'course-detail';
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-2xl shadow-lg' 
          : 'bg-white/70 backdrop-blur-2xl'
      } border-b border-neutral-200/50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                
                {/* Logo container */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all group-hover:scale-105">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Logo Text */}
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
                  Radio Online
                </span>
                <div className="text-xs font-semibold text-blue-600 -mt-1">ACADEMY</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <a 
                href="/#features" 
                className="px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
              >
                Features
              </a>
              <a 
                href="/#how-it-works" 
                className="px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
              >
                How It Works
              </a>
              
              {currentPage !== 'courses' && currentPage !== 'course-detail' && (
                <Link 
                  href="/courses"
                  className="relative px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all hover:scale-105"
                >
                  <span className="relative z-10">Mulai Belajar</span>
                </Link>
              )}
              
              {(currentPage === 'courses' || currentPage === 'course-detail') && (
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Kembali</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - FIXED & ENHANCED */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-20 left-0 right-0 bottom-0 bg-gradient-to-br from-white via-blue-50/30 to-white z-40 md:hidden overflow-y-auto animate-slide-down">
            <div className="p-6 space-y-3">
              {/* Menu Header */}
              <div className="mb-4">
                <h3 className="text-lg font-black text-neutral-900 mb-1">Menu Navigasi</h3>
                <p className="text-xs text-neutral-600">Jelajahi Radio Online Academy</p>
              </div>

              <a
                href="/#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center gap-4 px-5 py-4 bg-white text-neutral-700 hover:text-blue-600 rounded-2xl transition-all font-bold shadow-sm hover:shadow-md border border-neutral-100 hover:border-blue-200"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-neutral-900 group-hover:text-blue-600">Features</div>
                  <div className="text-xs text-neutral-500">Yang akan kamu pelajari</div>
                </div>
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              
              <a
                href="/#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center gap-4 px-5 py-4 bg-white text-neutral-700 hover:text-purple-600 rounded-2xl transition-all font-bold shadow-sm hover:shadow-md border border-neutral-100 hover:border-purple-200"
              >
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-neutral-900 group-hover:text-purple-600">How It Works</div>
                  <div className="text-xs text-neutral-500">Cara kerja pembelajaran</div>
                </div>
                <svg className="w-5 h-5 text-neutral-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              
              {currentPage !== 'courses' && currentPage !== 'course-detail' && (
                <Link
                  href="/courses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-4 px-5 py-4 bg-white text-neutral-700 hover:text-green-600 rounded-2xl transition-all font-bold shadow-sm hover:shadow-md border border-neutral-100 hover:border-green-200"
                >
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-neutral-900 group-hover:text-green-600">Lihat Courses</div>
                    <div className="text-xs text-neutral-500">Katalog lengkap course</div>
                  </div>
                  <svg className="w-5 h-5 text-neutral-400 group-hover:text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  href="/courses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative flex items-center justify-center gap-3 w-full px-6 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-black rounded-2xl hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                  <svg className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="relative z-10">Mulai Belajar Gratis</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="py-3">
                <div className="border-t-2 border-neutral-200"></div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider px-2">Kenapa Pilih Kami</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                    <div className="text-3xl font-black text-white mb-1">1,200+</div>
                    <div className="text-xs font-bold text-blue-100">Students Aktif</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                    <div className="text-3xl font-black text-white mb-1">4.9</div>
                    <div className="text-xs font-bold text-green-100">Rating Bintang 5</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                    <div className="text-3xl font-black text-white mb-1">500+</div>
                    <div className="text-xs font-bold text-purple-100">Radio Aktif</div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg">
                    <div className="text-3xl font-black text-white mb-1">24/7</div>
                    <div className="text-xs font-bold text-yellow-100">Support Online</div>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-4 pb-2">
                <div className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-100 rounded-xl">
                  <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs font-semibold text-neutral-600">Akses seumur hidup untuk semua course</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}