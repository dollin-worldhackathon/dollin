'use client'

// GET /api/chats → { rooms: Room[] }
// Room: { id, title, lastMessage, unreadCount, updatedAt, status: 'active'|'ended' }
// 탭 필터는 클라이언트에서 처리 (or ?status= 쿼리파라미터로 서버에서 처리해도 됨)

// 랜덤 매칭
// POST /api/random/match → 온라인 상태 + 랜덤 제외 설정 안 된 유저 찾기
// 새 채팅방 생성 → { roomId } 반환 → router.push('/chats/' + roomId)
// 매칭 상대 없으면 → 404 반환 → "지금은 상대가 없어요" 토스트 표시

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const tabs = ['All', 'Active', 'Ended', 'Saved']

// API 연결 전 임시 더미 데이터
const mockChats = [
  { id: '1', title: 'I need some warm comfort', preview: 'The other person is typing...', time: '3:20 PM', unread: 12 },
  { id: '2', title: 'Struggling with my career path', preview: 'Thank you, it really helped!', time: 'Yesterday', unread: 0 },
  { id: '3', title: 'Human relationships are so hard', preview: 'Sent a photo.', time: 'Yesterday', unread: 0 },
  { id: '4', title: 'Random counseling chat', preview: 'The conversation has ended.', time: '2 days ago', unread: 0 },
  { id: '5', title: 'Love life advice', preview: 'The conversation has ended.', time: '3 days ago', unread: 0 },
]

export default function ChatsPage() {
  const [tab, setTab] = useState('All')
  const router = useRouter()

  async function handleRandomMatch() {
    // TODO: const res = await fetch('/api/random/match', { method: 'POST' })
    // TODO: if (!res.ok) { 토스트 띄우기 '지금은 상대가 없어요'; return }
    // TODO: const { roomId } = await res.json()
    // TODO: router.push(`/chats/${roomId}`)
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex items-center justify-between px-5 py-3.5 shrink-0">
        <h1 className="text-[22px] font-bold text-foreground">My Chats</h1>
        {/* TODO: 실제 코인 잔액은 세션/컨텍스트에서 가져오기 */}
        <div className="flex items-center gap-1 bg-primary rounded-full px-3 py-1.5">
          <span className="w-4 h-4 rounded-full bg-surface flex items-center justify-center text-[10px] font-black text-primary">W</span>
          <span className="text-[13px] font-semibold text-foreground">120</span>
        </div>
      </div>

      <div className="px-5 mb-5 shrink-0">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => { /* TODO: 커뮤니티로 이동 후 글쓰기 모달 자동 오픈 */ }}
            className="bg-surface rounded-2xl p-5 text-center shadow-sm active:scale-95 transition-transform"
          >
            <div className="w-11 h-11 mx-auto mb-2.5 bg-secondary rounded-xl flex items-center justify-center text-accent">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
            <p className="text-[15px] font-bold text-foreground">Share a Worry</p>
            <p className="text-[11px] text-muted">Write a post</p>
          </button>

          <button
            onClick={handleRandomMatch}
            className="bg-surface rounded-2xl p-5 text-center shadow-sm active:scale-95 transition-transform"
          >
            <div className="w-11 h-11 mx-auto mb-2.5 bg-secondary rounded-xl flex items-center justify-center text-accent">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
                <line x1="4" y1="4" x2="9" y2="9" />
              </svg>
            </div>
            <p className="text-[15px] font-bold text-foreground">Random Match</p>
            <p className="text-[11px] text-muted">1:1 counseling</p>
          </button>
        </div>
      </div>

      <div className="flex gap-5 border-b border-border px-5 shrink-0">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative pt-3 pb-3 text-[14px] ${
              tab === t
                ? "text-foreground font-bold after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-foreground after:rounded"
                : 'text-muted font-medium'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TODO: 탭별 필터 로직 추가, 실제 API 데이터로 교체 */}
      <ul className="flex-1 overflow-y-auto px-5">
        {mockChats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => router.push(`/chats/${chat.id}`)}
            className="flex items-center gap-3 py-3.5 border-b border-border last:border-b-0 cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-foreground mb-0.5">{chat.title}</p>
              <p className="text-[12px] text-muted truncate">{chat.preview}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[11px] text-subtle mb-1">{chat.time}</p>
              {chat.unread > 0 && (
                <span className="inline-block bg-primary text-foreground text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {chat.unread}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
