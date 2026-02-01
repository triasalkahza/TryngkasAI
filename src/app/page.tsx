'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Sparkles, Zap, Bot, FileCode, Globe, Scale, Rocket, Users, MousePointerClick, Code, GraduationCap, Briefcase, BookOpen, Newspaper } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';


export default function Home() {

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhyUsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <AdvantagesSection />
        <CaseStudySection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full bg-background py-20 md:py-32 lg:py-40">
       <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)] dark:bg-grid-slate-700/40"></div>
      <div className="container relative text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Ringkas Dokumen dalam Hitungan Detik.
          </h1>
          <p className="mt-6 text-lg text-foreground/80 md:text-xl">
            Ringkas teks, PDF, atau link website secara instan dengan kecerdasan AI. Gratis, tanpa ribet.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto font-bold">
              <Link href="/summarizer">Mulai sekarang</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto font-bold">
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
    { icon: Zap, title: "Akses Instan", description: "Akses yang instan, dapat langsung digunakan untuk meringkas dan langsung selesai dalam sekejap." },
  ];

  return (
    <section id="features" className="w-full bg-primary text-primary-foreground py-20 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-accent sm:text-4xl">
            Kenapa Memilih TryngkasAI?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Kami menawarkan kombinasi terbaik antara kecepatan, keamanan, dan kemudahan penggunaan.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {advantages.map((adv) => (
            <Card key={adv.title} className="flex flex-col items-center text-center bg-primary-foreground/5 border-accent/20">
              <CardHeader className="items-center">
                <div className="mb-4 rounded-full bg-accent p-4 text-accent-foreground">
                  <adv.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-primary-foreground">{adv.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/80">{adv.description}</p>
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
      description: "Tekan tombol 'Ringkas Sekarang' dan dapatkan hasilnya dalam sekejap.",
    },
    {
      step: 4,
      title: "Manfaatkan Hasilnya",
      description: "Salin ringkasan ke clipboard, atau unduh sebagai file teks untuk digunakan nanti.",
    }
  ];

  return (
    <section id="how-it-works" className="w-full bg-background py-20 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Sangat Mudah Digunakan
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Hanya dalam empat langkah sederhana, informasi penting ada di tangan Anda.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">{step.step}</div>
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
        { icon: Bot, title: "Teknologi AI", description: "Memanfaatkan kekuatan model AI yang canggih untuk kualitas ringkasan terbaik." },
        { icon: FileCode, title: "Multi-Format", description: "Mendukung berbagai jenis input, dari teks biasa, dokumen PDF, hingga konten halaman web." },
        { icon: Globe, title: "Sepenuhnya Online", description: "Akses dari mana saja dan kapan saja. Tidak perlu instalasi perangkat lunak apa pun." },
        { icon: MousePointerClick, title: "Antarmuka Intuitif", description: "Didesain dengan antarmuka yang bersih dan ramah pengguna untuk pengalaman yang lancar." },
    ];
    return (
        <section className="py-20 md:py-24 lg:py-32 bg-primary text-primary-foreground">
            <div className="container">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="font-headline text-3xl font-bold tracking-tight text-accent sm:text-4xl">
                    Fitur Lengkap untuk Kebutuhan Anda
                  </h2>
                  <p className="mt-4 text-lg text-primary-foreground/80">
                    Semua yang Anda butuhkan untuk memahami konten lebih cepat.
                  </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    {featureList.map((feature) => (
                        <div key={feature.title} className="flex items-start gap-4">
                            <div className="mt-1 rounded-md bg-accent p-2 text-accent-foreground">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-headline text-lg font-bold text-primary-foreground">{feature.title}</h3>
                                <p className="mt-1 text-primary-foreground/70">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function AdvantagesSection() {
  const advantages = [
    { icon: Rocket, title: "Super Cepat", description: "Hemat waktu berharga Anda dengan teknologi peringkasan kilat." },
    { icon: Scale, title: "Skalabilitas", description: "Mampu menangani dokumen besar dan ringkasan massal dengan mudah." },
    { icon: Users, title: "Berpusat pada Pengguna", description: "Dirancang dengan antarmuka yang intuitif untuk pengalaman terbaik." },
    { icon: Code, title: "Open Source", description: "Kode sumber terbuka, transparan, dan dapat dikontribusikan oleh komunitas." }
  ];

  return (
    <section id="advantages" className="w-full bg-accent/20 py-20 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Keunggulan Kompetitif
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Lihat apa yang membuat TryngkasAI selangkah lebih maju.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((adv) => (
            <Card key={adv.title} className="flex flex-col items-center text-center bg-background/50">
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

function CaseStudySection() {
  const caseStudies = [
    {
      icon: GraduationCap,
      title: "Mahasiswa & Akademisi",
      description: "Meringkas jurnal ilmiah, buku teks, dan materi kuliah kompleks untuk mempercepat proses belajar dan penelitian."
    },
    {
      icon: Briefcase,
      title: "Profesional & Bisnis",
      description: "Menganalisis laporan pasar, dokumen hukum, dan artikel berita industri untuk pengambilan keputusan yang lebih cepat dan tepat."
    },
    {
      icon: BookOpen,
      title: "Penulis & Kreator Konten",
      description: "Menghasilkan ide konten, membuat draf, dan menyempurnakan tulisan dengan menganalisis berbagai sumber referensi secara efisien."
    },
    {
      icon: Newspaper,
      title: "Jurnalis & Media",
      description: "Merangkum siaran pers, transkrip wawancara, dan laporan panjang menjadi berita atau artikel yang padat dan informatif."
    }
  ];

  return (
    <section id="case-studies" className="w-full bg-background py-20 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Studi Kasus Pengguna
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Lihat bagaimana TryngkasAI membantu berbagai kalangan mencapai lebih banyak.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((study) => (
            <Card key={study.title} className="flex flex-col items-center text-center bg-card shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                  <study.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-foreground">{study.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{study.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Apakah TryngkasAI benar-benar gratis digunakan?",
      answer: "Ya, TryngkasAI sepenuhnya gratis untuk semua fitur utamanya, termasuk ringkasan teks, PDF, dan URL. Tidak ada biaya apapun."
    },
    {
      question: "Seberapa aman data dan file yang saya unggah?",
      answer: "Kami sangat memprioritaskan privasi Anda. File PDF diproses secara lokal di browser Anda dan tidak pernah diunggah atau disimpan di server kami. Konten teks dan URL hanya dikirim untuk dianalisis dan tidak disimpan setelahnya."
    },
    {
      question: "Format file apa saja yang didukung untuk ringkasan?",
      answer: "Saat ini kami mendukung unggahan file dalam format PDF. Untuk format lain, Anda dapat menyalin konten teksnya dan menempelkannya langsung ke tab 'Teks'."
    },
     {
      question: "Apakah ada batasan jumlah kata atau halaman?",
      answer: "Untuk ringkasan teks, batasnya adalah 15.000 karakter. Untuk PDF, batas ukuran filenya adalah 10MB. Ini sudah cukup untuk sebagian besar dokumen, seperti artikel, laporan, atau makalah."
    }
  ];

  return (
    <section id="faq" className="w-full bg-primary text-primary-foreground py-20 md:py-24 lg:py-32">
      <div className="container max-w-4xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-accent sm:text-4xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Menemukan jawaban yang Anda butuhkan? Jika tidak, jangan ragu untuk menghubungi kami.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b-primary-foreground/20">
              <AccordionTrigger className="text-left font-headline text-lg hover:text-accent transition-colors">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-primary-foreground/80">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
