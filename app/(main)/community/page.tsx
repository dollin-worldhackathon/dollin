'use client'

// GET /api/community/posts?category=all&page=1 → { posts: Post[], total }
// 카테고리 필터: ?category=love 등 전달, 'all'이면 전체 반환
// 검색: ?q=keyword (입력값 디바운스 처리 후 요청)

// 채팅 시작 플로우
// POST /api/chats { postId } → 현재 유저 + 글 작성자 사이에 채팅방 생성
// { roomId } 반환 → router.push('/chats/' + roomId)
// 두 사람 사이에 방이 이미 있으면 기존 roomId 그냥 반환

// 글 작성 (FAB 버튼)
// 바텀시트 모달 띄우기 → textarea + 카테고리 선택
// POST /api/community/posts { title, content, category } → 목록 새로고침

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categories = ['All', 'Love', 'Career', 'Relationships', 'Family', 'Daily Life']

// API 연결 전 임시 더미 데이터
const mockPosts = [
  {
    id: '1',
    category: 'Love',
    author: 'Anonymous Wind',
    time: '10 min ago',
    title: 'Should I break up with my partner of 3 years?',
    preview: "Lately we both seem so drained. The excitement is gone, conversations have dwindled. We end up just staring at our phones when we meet... Is it time to let go?",
    authorMeta: '25 yrs · Female',
  },
  {
    id: '2',
    category: 'Career',
    author: 'Anonymous Cloud',
    time: '1 hour ago',
    title: 'Is it too late to change careers at 30?',
    preview: "I've been at the same company for 7 years and I want to switch to software development. Everyone says it's too late, but I feel like I'll regret it if I don't try.",
    authorMeta: '30 yrs · Male',
  },
  {
    id: '3',
    category: 'Relationships',
    author: 'Anonymous Star',
    time: '3 hours ago',
    title: 'I cut off my best friend of 10 years',
    preview: 'We fought over something small and stopped talking. I think about them every day. Should I reach out first?',
    authorMeta: '28 yrs · Female',
  },
  {
    id: '4',
    category: 'Family',
    author: 'Anonymous Wave',
    time: '5 hours ago',
    title: "I can't communicate with my mom",
    preview: "Even in my 30s, she still treats me like a child. She doesn't respect my choices and it's exhausting. How do I get through to her?",
    authorMeta: '32 yrs · Male',
  },
]

type Post = (typeof mockPosts)[number]

export default function CommunityPage() {
  const [category, setCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const router = useRouter()

  const posts = category === 'All' ? mockPosts : mockPosts.filter((p) => p.category === category)

  async function startChat(post: Post) {
    // TODO: const res = await fetch('/api/chats', { method: 'POST', body: JSON.stringify({ postId: post.id }) })
    // TODO: const { roomId } = await res.json()
    // TODO: router.push(`/chats/${roomId}`)
    setSelectedPost(null)
  }

  return (
    <div className="h-full flex flex-col bg-background relative">
      <div className="flex items-center justify-between px-5 py-3.5 shrink-0">
        <h1 className="text-[22px] font-bold text-foreground">Community</h1>
        {/* TODO: 실제 코인 잔액은 세션/컨텍스트에서 가져오기 */}
        <div className="flex items-center gap-1 bg-primary rounded-full px-3 py-1.5">
          <span className="w-4 h-4 rounded-full bg-surface flex items-center justify-center text-[10px] font-black text-primary">W</span>
          <span className="text-[13px] font-semibold text-foreground">120</span>
        </div>
      </div>

      <div className="px-5 pb-3 shrink-0">
        <div className="flex items-center gap-2 bg-surface rounded-full px-4 py-2.5 shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-subtle shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {/* TODO: onChange 디바운스 → GET /api/community/posts?q=... */}
          <input
            type="text"
            placeholder="Search for someone's worry..."
            className="flex-1 bg-transparent text-[13px] outline-none text-foreground placeholder:text-subtle"
          />
        </div>
      </div>

      <div className="flex gap-2 px-5 pb-3 overflow-x-auto scrollbar-hide shrink-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] whitespace-nowrap border transition-colors ${
              category === cat
                ? 'bg-primary border-primary text-foreground font-bold'
                : 'bg-surface border-border text-muted font-medium'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 scrollbar-hide">
        {posts.map((post) => (
          <div key={post.id} className="bg-surface rounded-2xl p-4 mb-3 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[14px] font-bold text-foreground">{post.author}</p>
                <p className="text-[11px] text-subtle">{post.time}</p>
              </div>
              <span className="text-[11px] px-2.5 py-1 bg-secondary rounded-full text-accent font-semibold shrink-0">
                {post.category}
              </span>
            </div>
            <h3 className="text-[15px] font-bold text-foreground mb-1.5 leading-snug">{post.title}</h3>
            <p className="text-[13px] text-muted leading-relaxed mb-3.5 line-clamp-3">{post.preview}</p>
            <button
              onClick={() => setSelectedPost(post)}
              className="w-full flex items-center justify-center gap-1.5 bg-primary rounded-full py-3 text-[13px] font-bold text-foreground shadow-[0_2px_8px_rgba(158,215,195,0.4)] active:scale-95 transition-transform"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              1:1 Chat
            </button>
          </div>
        ))}
      </div>

      {/* FAB — 글쓰기 바텀시트 모달 열기 */}
      <button
        onClick={() => { /* TODO: setShowWriteModal(true) */ }}
        className="absolute bottom-20 right-5 w-14 h-14 rounded-full bg-primary shadow-[0_6px_16px_rgba(158,215,195,0.6)] flex items-center justify-center text-foreground active:scale-95 transition-transform"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {selectedPost && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 z-10">
          <div className="w-full bg-surface rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[17px] font-bold text-foreground">Start 1:1 Chat</h2>
              <button onClick={() => setSelectedPost(null)} className="text-muted text-xl leading-none">✕</button>
            </div>

            <div className="text-center py-4 pb-3">
              <div className="w-18 h-18 mx-auto mb-3.5 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-foreground">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <p className="text-[12px] text-muted mb-1.5">{selectedPost.category}</p>
              <p className="text-[16px] font-bold text-foreground leading-snug px-2 mb-1">{selectedPost.title}</p>
              <p className="text-[12px] text-muted">Start a private conversation with this person</p>
            </div>

            <div className="space-y-2 mb-5">
              <div className="flex justify-between px-3.5 py-2.5 bg-background rounded-xl text-[12px]">
                <span className="text-muted">Person</span>
                <span className="font-semibold text-foreground">{selectedPost.author} · {selectedPost.authorMeta}</span>
              </div>
              <div className="flex justify-between px-3.5 py-2.5 bg-background rounded-xl text-[12px]">
                <span className="text-muted">Chat limit</span>
                <span className="font-semibold text-foreground">50 messages (free)</span>
              </div>
              <div className="flex justify-between px-3.5 py-2.5 bg-background rounded-xl text-[12px]">
                <span className="text-muted">Cost to start</span>
                <span className="font-semibold text-accent">Free</span>
              </div>
            </div>

            <button
              onClick={() => startChat(selectedPost)}
              className="w-full bg-primary text-foreground font-bold py-3.5 rounded-2xl text-[15px]"
            >
              Start 1:1 Chat
            </button>
            <button onClick={() => setSelectedPost(null)} className="w-full text-muted text-[13px] py-3 mt-1.5">
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
