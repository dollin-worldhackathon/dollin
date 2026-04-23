'use client'

// GET /api/chats/[roomId] → { room: { title, partnerAge, partnerGender, msgCount, msgLimit } }
// GET /api/chats/[roomId]/messages → { messages: Message[] }
// 실시간 연결: ws://... 웹소켓 또는 /api/chats/[roomId]/stream SSE 방식
// 메시지 전송: POST /api/chats/[roomId]/messages { text } → UI 옵티미스틱 업데이트
// 이미지 전송: POST /api/upload → { url } → type:'image' 메시지로 전송

// 코인 전송
// MiniKit.commandsAsync.pay({ amount, to: 상대방 지갑 주소, token: 'WLD' })
// 결제 완료 후 POST /api/chats/[roomId]/extend { amount } → 서버에서 메시지 한도 늘려줌

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'

// API 연결 전 임시 더미 데이터
const mockMessages = [
  { id: 1, type: 'received', text: "Hi there,\nWhat's been on your mind?", time: '3:20 PM' },
  { id: 2, type: 'sent', text: "I've been feeling really drained lately,\nI needed someone to talk to...", time: '3:21 PM' },
  { id: 3, type: 'received', text: "That sounds really tough.\nWould you like to share more\nabout what's going on?", time: '3:22 PM' },
  { id: 4, type: 'sent', text: "Work is overwhelming and people around me\nare draining me. Every day feels heavy 😢", time: '3:23 PM' },
]

export default function ChatRoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params)
  const router = useRouter()

  const [showCoinModal, setShowCoinModal] = useState(false)
  const [coinAmount, setCoinAmount] = useState(20)
  const [text, setText] = useState('')

  async function sendMessage() {
    if (!text.trim()) return
    // TODO: await fetch(`/api/chats/${roomId}/messages`, { method: 'POST', body: JSON.stringify({ text }) })
    // TODO: 메시지 목록에 옵티미스틱 추가
    setText('')
  }

  async function sendCoin() {
    // TODO: const { finalPayload } = await MiniKit.commandsAsync.pay({
    //   amount: coinAmount,
    //   to: partnerWalletAddress, // room 데이터에서 가져옴
    //   token: 'WLD',
    //   description: memo,
    // })
    // TODO: await fetch(`/api/chats/${roomId}/extend`, { method: 'POST', body: JSON.stringify({ amount: coinAmount, payload: finalPayload }) })
    // TODO: UI에서 메시지 한도 업데이트
    setShowCoinModal(false)
  }

  return (
    <div className="h-full flex flex-col bg-background relative" data-room={roomId}>
      <div className="flex items-center px-5 py-3.5 bg-background shrink-0">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center text-foreground">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        {/* TODO: room.title + room.partnerAge + room.partnerGender 로 교체 */}
        <div className="flex-1 text-center">
          <p className="text-[16px] font-bold text-foreground">I need some warm comfort</p>
          <p className="text-[12px] text-muted">25 yrs · Female</p>
        </div>
        <button onClick={() => setShowCoinModal(true)} className="w-9 h-9 flex items-center justify-center text-foreground">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </button>
      </div>

      {/* TODO: room.msgCount + room.msgLimit API에서 받아오기 */}
      <div className="flex items-center justify-between px-5 py-3 bg-background border-b border-border shrink-0">
        <span className="text-[12px] text-muted">
          32 of <span className="text-foreground font-semibold">50</span> messages used
        </span>
        <button
          onClick={() => setShowCoinModal(true)}
          className="flex items-center gap-1 bg-primary rounded-full px-3 py-1.5 text-[11px] font-semibold text-foreground"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-surface flex items-center justify-center text-[9px] font-black text-primary">W</span>
          Extend for 20
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2 scrollbar-hide">
        <p className="text-center text-[11px] text-subtle my-2">Today</p>
        {/* TODO: mockMessages → 실제 API/소켓 데이터로 교체 */}
        {mockMessages.map((msg) => (
          <div key={msg.id} className={`flex max-w-[85%] mb-1.5 ${msg.type === 'sent' ? 'self-end' : 'self-start'}`}>
            <div className={`flex items-end gap-1.5 ${msg.type === 'sent' ? 'flex-row-reverse' : ''}`}>
              <div className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${
                msg.type === 'sent' ? 'bg-primary text-foreground rounded-tr-sm' : 'bg-surface text-foreground rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
              <span className="text-[10px] text-subtle whitespace-nowrap">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 pt-2 text-[11px] text-muted leading-relaxed shrink-0">
        • Conversations are limited to 50 messages.<br />
        • Use coins to extend when you reach the limit.
      </div>

      <div className="px-4 pt-2 pb-3 shrink-0">
        <div className="flex items-center gap-2 bg-surface rounded-full px-4 py-1.5 shadow-sm">
          <button
            onClick={() => { /* TODO: 이미지 선택 → /api/upload 업로드 → 메시지로 전송 */ }}
            className="text-muted flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
            placeholder="Type a message..."
            className="flex-1 text-[14px] outline-none bg-transparent py-2 text-foreground placeholder:text-subtle"
          />
          <button onClick={sendMessage} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-foreground">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a1 1 0 0 0-1.39 1.2L4.2 12 2 19.2a1 1 0 0 0 1.4 1.2z" />
            </svg>
          </button>
        </div>
      </div>

      {showCoinModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCoinModal(false)} />
          <div className="relative w-full bg-surface rounded-t-3xl pb-8 pt-2 shadow-2xl">
            <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />
            <div className="flex items-center justify-between px-5 mb-5">
              <h2 className="text-[17px] font-bold text-foreground">Send World Coin</h2>
              <button onClick={() => setShowCoinModal(false)} className="text-muted text-xl leading-none">✕</button>
            </div>

            <div className="px-5">
              <div className="bg-linear-to-br from-primary to-secondary rounded-2xl py-5 text-center mb-5">
                <p className="text-[40px] font-black text-foreground leading-none mb-1.5">{coinAmount}</p>
                <p className="text-[12px] text-foreground/70">WLD Coin</p>
              </div>

              {/* TODO: 실제 잔액은 세션/컨텍스트에서 가져오기 */}
              <div className="flex items-center justify-between bg-background rounded-xl px-4 py-4 mb-5">
                <span className="text-[13px] text-muted">Balance</span>
                <span className="text-[16px] font-bold text-foreground flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[11px] font-black text-surface">W</span>
                  120 coins
                </span>
              </div>

              <p className="text-[12px] font-semibold text-muted mb-2">Select amount</p>
              <div className="grid grid-cols-4 gap-2 mb-5">
                {[10, 20, 30, 50].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCoinAmount(n)}
                    className={`py-2.5 rounded-xl text-[12px] font-semibold border transition-colors ${
                      coinAmount === n ? 'bg-secondary border-primary text-foreground' : 'bg-background border-border text-foreground'
                    }`}
                  >
                    +{n}
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                placeholder="Add a note (optional) — let them know you care"
                className="w-full border border-border rounded-xl px-4 py-3 text-[13px] outline-none resize-none mb-5 font-sans bg-background text-foreground placeholder:text-subtle"
              />

              <button onClick={sendCoin} className="w-full bg-primary text-foreground font-bold py-3.5 rounded-2xl text-[15px]">
                Send World Coin
              </button>
              <button onClick={() => setShowCoinModal(false)} className="w-full text-muted text-[13px] py-3 mt-1.5">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
