'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const active = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <div className="h-dvh flex flex-col">
      <main className="flex-1 overflow-hidden">{children}</main>

      <nav className="h-16 bg-surface border-t border-border flex items-center justify-around shrink-0">
        <Link
          href="/chats"
          className={`flex flex-col items-center gap-0.5 px-5 py-1 text-[11px] ${active('/chats') ? 'text-foreground font-semibold' : 'text-subtle'}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Chats
        </Link>

        <Link
          href="/community"
          className={`flex flex-col items-center gap-0.5 px-5 py-1 text-[11px] ${active('/community') ? 'text-foreground font-semibold' : 'text-subtle'}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Explore
        </Link>

        <Link
          href="/me"
          className={`flex flex-col items-center gap-0.5 px-5 py-1 text-[11px] ${active('/me') ? 'text-foreground font-semibold' : 'text-subtle'}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          My Page
        </Link>
      </nav>
    </div>
  )
}
