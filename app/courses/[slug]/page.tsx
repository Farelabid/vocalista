/* eslint-disable @typescript-eslint/no-explicit-any */
// app/courses/[slug]/page.tsx - Enhanced Course Detail
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function CourseDetailPage() {
  const searchParams = useSearchParams();
  const variantId = searchParams.get('id');

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  });

  useEffect(() => {
    if (variantId) {
      fetchCourseDetail();
    }
  }, [variantId]);

  const fetchCourseDetail = async () => {
    try {
      const res = await fetch(`/api/courses?id=${variantId}`);
      
      if (!res.ok) throw new Error('Failed to fetch course');
      
      const data = await res.json();
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setPurchasing(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          variant_unique_id: variantId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('user_email', formData.customer_email);
        localStorage.setItem('user_name', formData.customer_name);
        window.location.href = data.paymentUrl;
      } else {
        alert('Gagal membuat pesanan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setPurchasing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-neutral-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <div className="text-neutral-600 font-medium">Memuat detail course...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
        <div className="text-center space-y-6 animate-scale-in max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 rounded-2xl">
            <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Course Tidak Ditemukan</h2>
            <p className="text-neutral-600">Course yang kamu cari tidak tersedia.</p>
          </div>
          <Link 
            href="/courses" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-all btn-hover-lift"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Kembali ke Courses</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-neutral-900">Radio Online Academy</span>
            </Link>

            <Link 
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Kembali ke Courses</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Section */}
        <section className="relative bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left - Course Info */}
              <div className="space-y-8 animate-slide-right">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <Link href="/courses" className="hover:text-neutral-900 transition-colors">Courses</Link>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-neutral-900 font-medium truncate max-w-[200px]">{course.name}</span>
                </div>

                {/* Title & Description */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                    {course.name}
                  </h1>
                  {course.description && (
                    <p className="text-lg text-neutral-600 leading-relaxed">
                      {course.description}
                    </p>
                  )}
                </div>

                {/* Course Image */}
                {course.image_url && (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-neutral-200 shadow-lg group">
                    <Image
                      src={course.image_url}
                      alt={course.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-neutral-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* What You'll Learn */}
                <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">Yang Akan Kamu Pelajari</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      'Setup server streaming radio',
                      'Konfigurasi Icecast/Shoutcast',
                      'Audio encoding & optimization',
                      'Playlist automation 24/7',
                      'Integrasi web player',
                      'Strategi monetisasi'
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-neutral-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Purchase Card */}
              <div className="animate-slide-up stagger-1">
                <div className="sticky top-24 bg-white rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden">
                  {/* Price Header */}
                  <div className="p-8 bg-gradient-to-br from-blue-50 to-white border-b border-neutral-100">
                    <div className="text-4xl font-bold text-neutral-900 mb-2">
                      {course.price > 0 ? formatPrice(course.price) : (
                        <span className="text-green-600">Gratis</span>
                      )}
                    </div>
                    <p className="text-neutral-600">Investasi terbaik untuk skill radio online</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handlePurchase} className="p-8 space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customer_name}
                        onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-neutral-900 rounded-xl border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.customer_email}
                        onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-neutral-900 rounded-xl border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        No. WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.customer_phone}
                        onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white text-neutral-900 rounded-xl border border-neutral-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        placeholder="08123456789"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={purchasing}
                      className="w-full py-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-hover-lift shadow-xl"
                    >
                      {purchasing ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Memproses...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Lanjut ke Pembayaran
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      )}
                    </button>

                    <p className="text-xs text-center text-neutral-500 flex items-center justify-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Pembayaran aman dengan Scalev
                    </p>
                  </form>

                  {/* What's Included */}
                  <div className="px-8 pb-8 space-y-3 border-t border-neutral-100 pt-6">
                    <h4 className="text-sm font-semibold text-neutral-900 mb-4">Yang Kamu Dapatkan:</h4>
                    {[
                      { icon: '♾️', text: 'Akses seumur hidup' },
                      { icon: '📺', text: 'Video HD quality' },
                      { icon: '📄', text: 'Materi PDF lengkap' },
                      { icon: '🎓', text: 'Sertifikat penyelesaian' },
                      { icon: '💬', text: 'Akses community group' },
                      { icon: '🔄', text: 'Update konten gratis' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-neutral-700">
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-4xl">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-neutral-200 mb-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'requirements', label: 'Requirements' },
                { id: 'instructor', label: 'Instructor' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'text-neutral-900 border-b-2 border-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {activeTab === 'overview' && (
                <div className="prose prose-neutral max-w-none">
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Course ini dirancang untuk siapa saja yang ingin membangun radio online profesional. 
                    Kamu akan belajar dari nol hingga radio online kamu live dan bisa diakses oleh pendengar di seluruh dunia.
                  </p>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-neutral-900">Yang Kamu Butuhkan:</h3>
                  <ul className="space-y-3 text-neutral-600">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Komputer/laptop dengan koneksi internet</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Tidak perlu background teknis (dijelaskan dari nol)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Semangat belajar dan praktek</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    RA
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Radio Online Academy Team</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Tim instruktur kami terdiri dari praktisi radio online yang sudah berpengalaman 
                      mengelola berbagai radio online sukses di Indonesia.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}