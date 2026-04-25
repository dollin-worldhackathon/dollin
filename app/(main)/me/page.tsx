'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { CoinTransaction } from '@/shared/lib/coin-store'

// TODO: GET /api/users/me 데이터로 교체
const stats = [
  { num: '12', label: 'Chats' },
  { num: '38', label: 'Posts' },
  { num: '4.8', label: 'Warmth Score' },
]

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-10 h-5.5 rounded-full relative transition-colors ${on ? 'bg-primary' : 'bg-border'}`}
    >
      <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-surface shadow-sm transition-all ${on ? 'right-0.5' : 'left-0.5'}`} />
    </button>
  )
}

export default function MePage() {
  const [notifOn, setNotifOn] = useState(true)
  const [excludeRandom, setExcludeRandom] = useState(false)
  const [balance, setBalance] = useState<string | null>(null)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showChargeModal, setShowChargeModal] = useState(false)
  const [history, setHistory] = useState<CoinTransaction[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/users/me/balance')
      .then((r) => r.json())
      .then(({ balance: bal, address }) => {
        setBalance(bal)
        if (address) setWalletAddress(address)
      })
      .catch(() => setBalance('0'))
  }, [])

  async function openHistory() {
    const res = await fetch('/api/users/me/coin-history')
    const { transactions } = await res.json()
    setHistory(transactions)
    setShowHistoryModal(true)
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : '—'

  return (
    <div className="h-full overflow-y-auto bg-background scrollbar-hide">
      <div className="px-5 py-3.5">
        <h1 className="text-[22px] font-bold text-foreground">My Page</h1>
      </div>

      <div className="px-5 pb-8">
        <div className="grid grid-cols-3 bg-surface rounded-2xl py-4 mb-4 shadow-sm">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center ${i < stats.length - 1 ? 'border-r border-border' : ''}`}>
              <p className="text-[18px] font-black text-foreground">{s.num}</p>
              <p className="text-[11px] text-muted mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-br from-primary to-secondary rounded-2xl p-4.5 mb-4.5 relative overflow-hidden">
          <div className="absolute w-36 h-36 rounded-full bg-white/15 -top-12 -right-10 pointer-events-none" />
          <p className="text-[12px] text-foreground/70 mb-1.5 relative">My World Coin Balance ({shortAddress})</p>
          <div className="flex items-center gap-2 mb-3.5 relative">
            <span className="w-6.5 h-6.5 rounded-full bg-surface flex items-center justify-center text-[13px] font-black text-primary">W</span>
            <span className="text-[28px] font-black text-foreground">
              {balance === null ? '...' : balance}
            </span>
            <span className="text-[14px] font-semibold text-foreground/70 mt-1">WLD</span>
          </div>
          <div className="flex gap-2 relative">
            <button
              onClick={() => setShowChargeModal(true)}
              className="flex-1 bg-foreground text-surface rounded-xl py-2.5 text-[13px] font-bold"
            >
              Charge Coins
            </button>
            <button
              onClick={openHistory}
              className="flex-1 bg-white/40 text-foreground rounded-xl py-2.5 text-[13px] font-bold"
            >
              History
            </button>
          </div>
        </div>

        <p className="text-[12px] font-bold text-subtle uppercase tracking-wide px-1 mb-2">My Info</p>
        <div className="bg-surface rounded-2xl mb-4 shadow-sm overflow-hidden">
          <button
            onClick={() => { /* TODO: 인풋 모달 열기, PATCH /api/users/me { nickname } */ }}
            className="flex items-center justify-between w-full px-4 py-3.5 border-b border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="text-[14px] text-foreground">Nickname</span>
            </div>
            <span className="text-[13px] text-muted flex items-center gap-1">Gimbap <span className="text-subtle">›</span></span>
          </button>

          <button
            onClick={() => { /* TODO: 나이 피커 모달, PATCH /api/users/me { age } */ }}
            className="flex items-center justify-between w-full px-4 py-3.5 border-b border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span className="text-[14px] text-foreground">Age</span>
            </div>
            <span className="text-[13px] text-muted flex items-center gap-1">25 <span className="text-subtle">›</span></span>
          </button>

          <button
            onClick={() => { /* TODO: 성별 선택 모달, PATCH /api/users/me { gender } */ }}
            className="flex items-center justify-between w-full px-4 py-3.5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <span className="text-[14px] text-foreground">Gender</span>
            </div>
            <span className="text-[13px] text-muted flex items-center gap-1">Female <span className="text-subtle">›</span></span>
          </button>
        </div>

        <p className="text-[12px] font-bold text-subtle uppercase tracking-wide px-1 mb-2">Settings</p>
        <div className="bg-surface rounded-2xl mb-4 shadow-sm overflow-hidden">
          <button
            onClick={() => { /* TODO: PATCH /api/users/me/password { currentPw, newPw } */ }}
            className="flex items-center justify-between w-full px-4 py-3.5 border-b border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span className="text-[14px] text-foreground">Change Password</span>
            </div>
            <span className="text-subtle">›</span>
          </button>

          <div className="flex items-center justify-between w-full px-4 py-3.5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <span className="text-[14px] text-foreground">Notifications</span>
            </div>
            <Toggle on={notifOn} onToggle={() => { setNotifOn(!notifOn); /* TODO: PATCH /api/users/me/settings { notifications: !notifOn } */ }} />
          </div>

          <div className="flex items-center justify-between w-full px-4 py-3.5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] text-foreground">Exclude from Random</p>
                <p className="text-[11px] text-subtle mt-0.5">You won&apos;t appear in random matching</p>
              </div>
            </div>
            <Toggle on={excludeRandom} onToggle={() => { setExcludeRandom(!excludeRandom); /* TODO: PATCH /api/users/me/settings { excludeFromRandom: !excludeRandom } */ }} />
          </div>

          <button
            onClick={() => { /* TODO: GET /api/users/me/blocked → 모달에서 목록 표시, DELETE /api/users/me/blocked/[userId] 로 차단 해제 */ }}
            className="flex items-center justify-between w-full px-4 py-3.5 border-b border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              </div>
              <span className="text-[14px] text-foreground">Blocked Users</span>
            </div>
            <span className="text-[13px] text-muted flex items-center gap-1">3 users <span className="text-subtle">›</span></span>
          </button>

          <button
            onClick={() => { /* TODO: 고객센터 채팅 또는 이메일 링크 연결 */ }}
            className="flex items-center justify-between w-full px-4 py-3.5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-accent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <span className="text-[14px] text-foreground">Support</span>
            </div>
            <span className="text-subtle">›</span>
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-surface border border-border rounded-2xl py-3.5 text-[14px] text-muted shadow-sm"
        >
          Log Out
        </button>
      </div>

      {/* 사용 내역 모달 */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowHistoryModal(false)} />
          <div className="relative w-full bg-surface rounded-t-3xl pb-8 pt-2 shadow-2xl max-h-[70dvh] flex flex-col">
            <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4 shrink-0" />
            <div className="flex items-center justify-between px-5 mb-4 shrink-0">
              <h2 className="text-[17px] font-bold text-foreground">Coin History</h2>
              <button onClick={() => setShowHistoryModal(false)} className="text-muted text-xl leading-none">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 scrollbar-hide">
              {history.length === 0 ? (
                <p className="text-center text-[13px] text-muted py-8">No transactions yet</p>
              ) : (
                history.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-3.5 border-b border-border last:border-b-0">
                    <div>
                      <p className="text-[14px] font-semibold text-foreground">
                        Chat extended +{tx.amount} messages
                      </p>
                      <p className="text-[11px] text-subtle mt-0.5">
                        {new Date(tx.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <span className="text-[14px] font-bold text-foreground">-{tx.amount} WLD</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 충전 안내 모달 */}
      {showChargeModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowChargeModal(false)} />
          <div className="relative w-full bg-surface rounded-t-3xl pb-8 pt-2 shadow-2xl">
            <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />
            <div className="flex items-center justify-between px-5 mb-5">
              <h2 className="text-[17px] font-bold text-foreground">Get WLD Coins</h2>
              <button onClick={() => setShowChargeModal(false)} className="text-muted text-xl leading-none">✕</button>
            </div>
            <div className="px-5">
              <div className="bg-background rounded-2xl p-4 mb-5 text-center">
                <p className="text-[32px] mb-2">🌍</p>
                <p className="text-[15px] font-bold text-foreground mb-1.5">WLD is available in World App</p>
                <p className="text-[13px] text-muted leading-relaxed">
                  You can receive WLD through World App grants or purchase it on supported exchanges.
                </p>
              </div>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-3 bg-background rounded-xl px-4 py-3.5">
                  <span className="text-[20px]">✅</span>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">World ID Verified</p>
                    <p className="text-[11px] text-muted">Verified humans receive WLD grants monthly</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-background rounded-xl px-4 py-3.5">
                  <span className="text-[20px]">💱</span>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">Exchange</p>
                    <p className="text-[11px] text-muted">Buy WLD on Binance, Coinbase, and others</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowChargeModal(false)}
                className="w-full bg-primary text-foreground font-bold py-3.5 rounded-2xl text-[15px]"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
