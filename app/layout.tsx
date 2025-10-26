// app/layout.tsx - Fixed with ToastProvider
import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Radio Online Academy - Belajar Membangun Radio Online Profesional",
  description: "Platform pembelajaran lengkap untuk membangun dan mengelola radio online. Dari setup teknis, streaming, hingga monetisasi.",
  keywords: "radio online, streaming, broadcasting, audio production, radio internet",
  authors: [{ name: "Radio Online Academy" }],
  openGraph: {
    title: "Radio Online Academy",
    description: "Belajar membangun radio online profesional dari nol",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}