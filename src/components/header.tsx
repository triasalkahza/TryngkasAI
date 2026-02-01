'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
    { name: 'Fitur', href: '/#features' },
    { name: 'Cara Kerja', href: '/#how-it-works' },
    { name: 'Keunggulan', href: '/#advantages' },
    { name: 'FAQ', href: '/#faq' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // For summarizer page, links should point to homepage sections
  const getHref = (href: string) => {
    const isClient = typeof window !== 'undefined';
    if (isClient && window.location.pathname === '/summarizer') {
      return `/${href}`;
    }
    return href;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center">
          <Logo />
        </div>
        
        <nav className="mx-auto hidden items-center gap-6 text-sm font-semibold md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={getHref(link.href)}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden md:flex">
             <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              <Link href="/summarizer">Mulai Meringkas</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
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
                        href={getHref(link.href)}
                        className="text-lg font-semibold"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/summarizer">Mulai Meringkas</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
