
'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';

// Since we are using client-side hooks, we need to manage metadata differently.
// We can't export it from a client component directly.
// For this case, we will set it in the head manually.
// export const metadata: Metadata = {
//   title: 'TaskEase',
//   description: 'A simple and smart to-do list app.',
// };

const rainbowColors = [
  '#FF0000', // Red
  '#FF7F00', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#0000FF', // Blue
  '#4B0082', // Indigo
  '#9400D3', // Violet
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % rainbowColors.length);
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);


  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <title>TaskEase</title>
        <meta name="description" content="A simple and smart to-do list app." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'font-body antialiased h-full'
        )}
        >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div 
            className="h-full transition-colors duration-1000"
            style={{ backgroundColor: rainbowColors[colorIndex] }}
          >
            <Header />
            <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12">
                {children}
            </main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
