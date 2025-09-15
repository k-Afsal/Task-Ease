
'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';

// Since we are using client-side hooks, we need to manage metadata differently.
// We can't export it from a client component directly.
// For this case, we will set it in the head manually.
// export const metadata: Metadata = {
//   title: 'TaskEase',
//   description: 'A simple and smart to-do list app.',
// };

const rainbowColors = [
  'hsl(0, 80%, 90%)',    // Light Red
  'hsl(30, 80%, 90%)',   // Light Orange
  'hsl(60, 80%, 90%)',   // Light Yellow
  'hsl(120, 80%, 90%)',  // Light Green
  'hsl(180, 80%, 90%)',  // Light Cyan
  'hsl(240, 80%, 90%)',  // Light Blue
  'hsl(300, 80%, 90%)',  // Light Magenta
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [colorIndex, setColorIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % rainbowColors.length);
    }, 60 * 1000); // Change color every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="en" className="h-full">
      <head>
        <title>TaskEase</title>
        <meta name="description" content="A simple and smart to-do list app." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'font-body antialiased h-full bg-cover bg-fixed bg-center transition-colors duration-1000',
        )}
        style={{
          backgroundColor: isMounted ? rainbowColors[colorIndex] : 'hsl(var(--background))',
        }}
        >
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12">
            {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
