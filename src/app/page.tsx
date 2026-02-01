'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { Menu, ShieldCheck, Sparkles, Zap, Bot, FileCode, Globe } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
  { name: 'Cara Kerja', href: '#how-it-works' },
  { name: 'Fitur', href: '#features' },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Header onMobileMenuToggle={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      <main className="flex-1">
        <HeroSection />
        <WhyUsSection />
        <HowItWorksSection />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}

function Header({ onMobileMenuToggle, isMobileMenuOpen }: { onMobileMenuToggle: (open: boolean) => void, isMobileMenuOpen: boolean }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Button asChild variant="ghost" className="text-foreground/60">
            <Link href="/summarizer">Gunakan Sekarang</Link>
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/summarizer">Mulai Meringkas</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={onMobileMenuToggle}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Logo />
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium"
                      onClick={() => onMobileMenuToggle(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => onMobileMenuToggle(false)}>
                  <Link href="/summarizer">Mulai Meringkas</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40">
       <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)] dark:bg-grid-slate-700/40"></div>
      <div className="container relative text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Pahami Dokumen Panjang dalam Hitungan Detik.
          </h1>
          <p className="mt-6 text-lg text-foreground/80 md:text-xl">
            Ringkas teks, PDF, atau link website secara instan dengan kecerdasan AI. Gratis, tanpa ribet.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto">
              <Link href="/summarizer">Ringkas Sekarang</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="#how-it-works">Pelajari Caranya</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const advantages = [
    { icon: ShieldCheck, title: "Privasi Aman", description: "File PDF Anda diproses dan diringkas tanpa disimpan di server kami, menjamin kerahasiaan data." },
    { icon: Sparkles, title: "Akurasi Tinggi", description: "Didukung oleh model AI terbaru untuk menghasilkan ringkasan yang koheren dan relevan." },
    { icon: Zap, title: "Akses Instan", description: "Tidak perlu login atau registrasi. Langsung gunakan, ringkas, dan selesai dalam sekejap." },
  ];

  return (
    <section id="features" className="w-full bg-secondary/50 py-20 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Kenapa Memilih TryngkasAI?
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Kami menawarkan kombinasi terbaik antara kecepatan, keamanan, dan kemudahan penggunaan.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {advantages.map((adv) => (
            <Card key={adv.title} className="flex flex-col items-center text-center">
              <CardHeader className="items-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                  <adv.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">{adv.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{adv.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
    const steps = [
    {
      step: 1,
      title: "Pilih Tipe Input",
      description: "Pilih antara Teks, Upload PDF, atau URL Website sesuai dengan sumber yang ingin Anda ringkas.",
    },
    {
      step: 2,
      title: "Masukkan Konten",
      description: "Tempelkan teks, unggah file PDF Anda, atau masukkan link website yang ingin diproses.",
    },
    {
      step: 3,
      title: "Dapatkan Ringkasan",
      description: "Tekan tombol 'Ringkas Sekarang' dan dapatkan hasilnya dalam sekejap. Salin atau unduh sesuai kebutuhan.",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-20 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Sangat Mudah Digunakan
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Hanya dalam tiga langkah sederhana, informasi penting ada di tangan Anda.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-10 hidden h-full w-px -translate-x-1/2 bg-border md:block"></div>
          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">{step.step}</div>
                <h3 className="mt-6 font-headline text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
    const featureList = [
        { icon: Bot, title: "Didukung Gemini AI", description: "Memanfaatkan kekuatan model AI tercanggih dari Google untuk kualitas ringkasan terbaik." },
        { icon: FileCode, title: "Multi-Format", description: "Mendukung berbagai jenis input, dari teks biasa, dokumen PDF, hingga konten halaman web." },
        { icon: Globe, title: "Sepenuhnya Online", description: "Akses dari mana saja dan kapan saja. Tidak perlu instalasi perangkat lunak apa pun." },
    ];
    return (
        <section className="py-20 md:py-24 lg:py-32 bg-secondary/50">
            <div className="container">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    Fitur Lengkap untuk Kebutuhan Anda
                  </h2>
                  <p className="mt-4 text-lg text-foreground/80">
                    Semua yang Anda butuhkan untuk memahami konten lebih cepat.
                  </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {featureList.map((feature) => (
                        <div key={feature.title} className="flex items-start gap-4">
                            <div className="mt-1 rounded-md bg-primary/10 p-2 text-primary">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-headline text-lg font-bold">{feature.title}</h3>
                                <p className="mt-1 text-foreground/70">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-center text-sm text-foreground/60">
          Build with ❤️ by <span className="font-bold">Trisakti Akbar</span>
        </p>
      </div>
    </footer>
  );
}
