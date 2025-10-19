/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user dari localStorage
    const email = localStorage.getItem('user_email');
    const name = localStorage.getItem('user_name');
    
    if (email) {
      setUserEmail(email);
      setUserName(name || '');
      fetchEnrollments(email);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchEnrollments = async (email: string) => {
    try {
      const res = await fetch(`/api/orders?email=${email}`);
      const data = await res.json();
      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Jika belum login
  if (!userEmail) {
    return (
      <div className="min-h-screen bg-slate-900">
        <header className="bg-slate-800 border-b border-slate-700">
          <div className="container mx-auto px-4 py-6">
            <Link href="/" className="text-2xl font-bold text-white">
              Vocalista
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Kamu Belum Login
          </h1>
          <p className="text-slate-400 mb-8">
            Silakan beli course terlebih dahulu untuk mengakses dashboard
          </p>
          <Link
            href="/courses"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Lihat Courses
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              Vocalista
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-slate-400 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* User Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Dashboard
          </h1>
          <p className="text-slate-400">
            Selamat datang, {userName || userEmail}
          </p>
        </div>

        {/* My Courses Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Course Saya
          </h2>

          {enrollments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.order_id}
                  className="bg-slate-800 rounded-xl overflow-hidden"
                >
                  <div className="aspect-video bg-slate-700 flex items-center justify-center">
                    <span className="text-6xl">🎙️</span>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {enrollment.course_name}
                    </h3>
                    
                    <p className="text-slate-400 text-sm mb-4">
                      Terdaftar: {new Date(enrollment.enrolled_at).toLocaleDateString('id-ID')}
                    </p>

                    <Link
                      href={`/lessons/${enrollment.course_id}`}
                      className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition"
                    >
                      Mulai Belajar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800 rounded-xl p-12 text-center">
              <p className="text-slate-400 text-lg mb-6">
                Kamu belum memiliki course aktif
              </p>
              <Link
                href="/courses"
                className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Jelajahi Courses
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}