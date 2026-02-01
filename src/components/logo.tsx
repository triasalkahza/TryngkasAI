import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'font-headline text-2xl font-extrabold text-primary tracking-tighter',
        className
      )}
    >
      TryngkasAI<span className="text-accent">.</span>
    </Link>
  );
}
