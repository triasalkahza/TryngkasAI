'use client';

import { SummarizerTool } from '@/components/summarizer-tool';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function SummarizerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
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
      <Footer />
    </div>
  );
}
