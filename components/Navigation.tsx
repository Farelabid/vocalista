/* eslint-disable @next/next/no-html-link-for-pages */
// components/Navigation.tsx - Premium Navigation dengan Mobile Menu
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-20 left-0 right-0 bottom-0 bg-white z-40 md:hidden overflow-y-auto">
            <div className="p-6 space-y-2">
              <a
                href="/#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-4 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-2xl transition-all font-semibold"
              >
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Features
              </a>
              
              <a
                href="/#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-4 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-2xl transition-all font-semibold"
              >
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                How It Works
              </a>
              
              {currentPage !== 'courses' && (
                <Link
                  href="/courses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-4 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-2xl transition-all font-semibold"
                >
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Lihat Courses
                </Link>
              )}

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  href="/courses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full px-6 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-black rounded-2xl hover:from-blue-700 hover:to-purple-700 shadow-2xl transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Mulai Belajar Gratis
                </Link>
              </div>

              {/* Divider */}
              <div className="py-4">
                <div className="border-t-2 border-neutral-100"></div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-100">
                  <div className="text-3xl font-black text-blue-600">1,200+</div>
                  <div className="text-xs font-bold text-neutral-600">Students</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-100">
                  <div className="text-3xl font-black text-green-600">4.9/5</div>
                  <div className="text-xs font-bold text-neutral-600">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}