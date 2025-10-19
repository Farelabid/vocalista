// app/lessons/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// DEMO: Data lessons (nanti bisa dari Scalev product description atau API terpisah)
const DEMO_LESSONS = [
  {
    id: '1',
    title: 'Introduction to Voice Over',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 15,
  },
  {
    id: '2',
    title: 'Voice Techniques & Warm-up',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 20,
  },
  {
    id: '3',
    title: 'Recording Best Practices',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 25,
  },
];

export default function LessonPage() {
  const params = useParams();
  const courseId = params.id as string;

  const [currentLesson, setCurrentLesson] = useState(DEMO_LESSONS[0]);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    // Check jika user punya akses ke course ini
    const email = localStorage.getItem('user_email');
    
    if (!email) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/orders?email=${email}`);
      const enrollments = await res.json();
      
      // Check jika course ini ada dalam enrollments
      const hasThisCourse = enrollments.some(
        (e: any) => e.course_id === courseId
      );
      
      setHasAccess(hasThisCourse);
    } catch (error) {
      console.error('Error checking access:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-900">
        <header className="bg-slate-800 border-b border-slate-700">
          <div className="container mx-auto px-4 py-6">
            <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">
              ← Kembali ke Dashboard
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Kamu Belum Memiliki Akses
          </h1>
          <p className="text-slate-400 mb-8">
            Silakan beli course ini terlebih dahulu untuk mengakses konten
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
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">
            ← Kembali ke Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Video Player Area */}
        <main className="flex-1">
          <div className="aspect-video bg-black">
            <iframe
              src={currentLesson.video_url}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-2">
              {currentLesson.title}
            </h1>
            <p className="text-slate-400">
              Durasi: {currentLesson.duration} menit
            </p>
          </div>
        </main>

        {/* Lesson Sidebar */}
        <aside className="w-80 bg-slate-800 border-l border-slate-700 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-4">
              Course Content
            </h2>

            <div className="space-y-2">
              {DEMO_LESSONS.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLesson(lesson)}
                  className={`w-full text-left p-4 rounded-lg transition ${
                    currentLesson.id === lesson.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <div className="font-semibold mb-1">{lesson.title}</div>
                  <div className="text-sm opacity-80">
                    {lesson.duration} menit
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}