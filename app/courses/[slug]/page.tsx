/* eslint-disable @typescript-eslint/no-explicit-any */
// app/courses/[slug]/page.tsx - Course Detail with Consistent Design
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CourseDetailSkeleton } from '@/components/Skeletons';
import { toast } from '@/components/SimpleToast';

interface FormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
}

interface FormErrors {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
}

export default function CourseDetailPage() {
  const searchParams = useSearchParams();
  const variantId = searchParams.get('id');

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState<FormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  });

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!variantId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`/api/courses?id=${variantId}`);

        if (!res.ok) throw new Error('Course not found');

        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
        toast.error('Gagal memuat detail course. Silakan refresh halaman.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [variantId]);

  useEffect(() => {
    const savedEmail = localStorage.getItem('user_email');
    const savedName = localStorage.getItem('user_name');
    const savedPhone = localStorage.getItem('user_phone');

    if (savedEmail || savedName || savedPhone) {
      setFormData({
        customer_name: savedName || '',
        customer_email: savedEmail || '',
        customer_phone: savedPhone || '',
      });
    }
  }, []);

  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email wajib diisi';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Format email tidak valid';
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone) return 'Nomor WhatsApp wajib diisi';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) return 'Nomor terlalu pendek';
    if (cleaned.length > 15) return 'Nomor terlalu panjang';
    return undefined;
  };

  const validateName = (name: string): string | undefined => {
    if (!name) return 'Nama wajib diisi';
    if (name.length < 3) return 'Nama minimal 3 karakter';
    return undefined;
  };

  const validateField = (name: keyof FormData, value: string) => {
    let error: string | undefined;
    switch (name) {
      case 'customer_email': error = validateEmail(value); break;
      case 'customer_phone': error = validatePhone(value); break;
      case 'customer_name': error = validateName(value); break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name as keyof FormData, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof FormData, value);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      customer_name: validateName(formData.customer_name),
      customer_email: validateEmail(formData.customer_email),
      customer_phone: validatePhone(formData.customer_phone),
    };
    setErrors(newErrors);
    setTouched({ customer_name: true, customer_email: true, customer_phone: true });
    return !Object.values(newErrors).some(error => error !== undefined);
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Mohon lengkapi form dengan benar');
      return;
    }

    setPurchasing(true);
    try {
      let phone = formData.customer_phone.replace(/\D/g, '');
      if (phone.startsWith('0')) {
        phone = '62' + phone.substring(1);
      } else if (!phone.startsWith('62')) {
        phone = '62' + phone;
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: phone,
          variant_unique_id: variantId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('user_email', formData.customer_email);
        localStorage.setItem('user_name', formData.customer_name);
        localStorage.setItem('user_phone', formData.customer_phone);

        toast.success('Order berhasil dibuat! Mengarahkan ke pembayaran...');
        setTimeout(() => {
          window.location.href = data.paymentUrl;
        }, 1500);
      } else {
        throw new Error(data.error || 'Gagal membuat order');
      }
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast.error(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
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

  if (loading) return <CourseDetailSkeleton />;

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 flex items-center justify-center p-4 sm:p-6">
        <div className="text-center space-y-6 animate-scale-in max-w-md">
          <div className="text-6xl sm:text-8xl mb-4" aria-hidden="true">😕</div>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 mb-3">Course Tidak Ditemukan</h2>
          <p className="text-base sm:text-lg text-neutral-600">Course yang kamu cari tidak tersedia.</p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-black rounded-2xl hover:from-blue-700 hover:to-purple-700 shadow-2xl transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
      {/* Navigation - Unified Component */}
      <Navigation currentPage="course-detail" />

      {/* Main Content */}
      <main className="pt-24 sm:pt-32 pb-12 sm:pb-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left - Course Info (3 columns) */}
            <div className="lg:col-span-3 space-y-8 sm:space-y-10">
              {/* Course Image */}
              {course.image_url && (
                <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-white shadow-2xl group">
                  <Image
                    src={course.image_url}
                    alt={course.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 sm:p-8">
                    <div className="text-white">
                      <div className="text-xs font-bold uppercase tracking-wider mb-2">Preview</div>
                      <div className="text-xl sm:text-2xl font-black">Play Course Intro →</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-neutral-900 leading-tight">
                  {course.name}
                </h1>
                {course.description && (
                  <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed">
                    {course.description}
                  </p>
                )}
              </div>

              {/* What You'll Learn */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl border-2 border-blue-100">
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mb-5 sm:mb-6 flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl" aria-hidden="true">✨</span>
                  Yang Akan Kamu Pelajari
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    'Setup server streaming radio',
                    'Konfigurasi Icecast/Shoutcast',
                    'Audio encoding & optimization',
                    'Playlist automation 24/7',
                    'Integrasi web player',
                    'Strategi monetisasi'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm sm:text-base font-bold text-neutral-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Purchase Card (2 columns) */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-white rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-white shadow-2xl overflow-hidden">
                {/* Price Header */}
                <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                  <div className="relative">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2">
                      {course.price > 0 ? formatPrice(course.price) : (
                        <span className="text-yellow-300">GRATIS</span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-blue-100 font-semibold">Investasi terbaik untuk skill radio online</p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handlePurchase} className="p-6 sm:p-8 space-y-5 sm:space-y-6">
                  {['customer_name', 'customer_email', 'customer_phone'].map((field) => (
                    <div key={field}>
                      <label htmlFor={field} className="block text-sm font-black text-neutral-900 mb-2">
                        {field === 'customer_name' ? '✍️ Nama Lengkap' :
                         field === 'customer_email' ? '📧 Email' :
                         '📱 No. WhatsApp'}
                      </label>
                      <input
                        id={field}
                        type={field === 'customer_email' ? 'email' : field === 'customer_phone' ? 'tel' : 'text'}
                        name={field}
                        required
                        value={formData[field as keyof FormData]}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 sm:px-5 py-3 sm:py-4 bg-neutral-50 text-neutral-900 rounded-xl sm:rounded-2xl border-2 transition-all outline-none font-semibold text-sm sm:text-base ${
                          errors[field as keyof FormData] && touched[field]
                            ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                            : 'border-neutral-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                        }`}
                        placeholder={
                          field === 'customer_name' ? 'John Doe' :
                          field === 'customer_email' ? 'john@example.com' :
                          '08123456789'
                        }
                        aria-invalid={errors[field as keyof FormData] && touched[field] ? 'true' : 'false'}
                        aria-describedby={errors[field as keyof FormData] && touched[field] ? `${field}-error` : undefined}
                      />
                      {errors[field as keyof FormData] && touched[field] && (
                        <p id={`${field}-error`} className="mt-2 text-sm font-bold text-red-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors[field as keyof FormData]}
                        </p>
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={purchasing}
                    className="w-full py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base sm:text-lg font-black rounded-xl sm:rounded-2xl hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2"
                    aria-busy={purchasing}
                  >
                    {purchasing ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        🚀 Lanjut ke Pembayaran
                      </span>
                    )}
                  </button>

                  <p className="text-xs text-center text-neutral-500 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Pembayaran aman dengan Scalev
                  </p>
                </form>

                {/* What's Included */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-3 border-t-2 border-neutral-100 pt-6">
                  <h4 className="text-sm font-black text-neutral-900 mb-4">🎁 Yang Kamu Dapatkan:</h4>
                  {[
                    { icon: '♾️', text: 'Akses seumur hidup' },
                    { icon: '📺', text: 'Video HD quality' },
                    { icon: '📄', text: 'Materi PDF lengkap' },
                    { icon: '🎓', text: 'Sertifikat' },
                    { icon: '💬', text: 'Community group' },
                    { icon: '🔄', text: 'Update gratis' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm sm:text-base font-semibold text-neutral-700 p-2 hover:bg-neutral-50 rounded-xl transition-colors">
                      <span className="text-xl sm:text-2xl" aria-hidden="true">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}