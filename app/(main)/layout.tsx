import Link from "next/link";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh flex flex-col">
      <main className="flex-1 overflow-y-auto">{children}</main>
      <nav className="flex border-t border-gray-200 bg-white">
        <Link href="/chats" className="flex-1 flex flex-col items-center py-3 gap-1 text-xs text-gray-500 hover:text-primary">
          <span className="text-xl">💬</span>
          <span>채팅</span>
        </Link>
        <Link href="/random" className="flex-1 flex flex-col items-center py-3 gap-1 text-xs text-gray-500 hover:text-primary">
          <span className="text-xl">🎲</span>
          <span>랜덤</span>
        </Link>
        <Link href="/community" className="flex-1 flex flex-col items-center py-3 gap-1 text-xs text-gray-500 hover:text-primary">
          <span className="text-xl">📋</span>
          <span>커뮤니티</span>
        </Link>
        <Link href="/me" className="flex-1 flex flex-col items-center py-3 gap-1 text-xs text-gray-500 hover:text-primary">
          <span className="text-xl">👤</span>
          <span>내 정보</span>
        </Link>
      </nav>
    </div>
  );
}
