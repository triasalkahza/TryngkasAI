'use client';

import { SummarizerTool } from '@/components/summarizer-tool';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function SummarizerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <Button asChild variant="outline" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section
          id="summarizer"
          className="w-full bg-background py-12 md:py-16 lg:py-20"
        >
          <div className="container">
            <SummarizerTool />
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex h-16 items-center justify-center">
          <p className="text-center text-sm text-foreground/60">
            Build with ❤️ by <span className="font-bold">Trisakti Akbar</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
