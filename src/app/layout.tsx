import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'TaskEase',
  description: 'A simple and smart to-do list app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body 
        className={cn(
          'font-body antialiased h-full bg-cover bg-fixed bg-center',
        )}
        style={{
          backgroundImage: "url('https://picsum.photos/seed/3/1920/1080')",
        }}
        data-ai-hint="background landscape"
        >
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12">
            {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
