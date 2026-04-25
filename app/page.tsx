'use client'

import Image from 'next/image'
import { MiniKit } from '@worldcoin/minikit-js'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleWorldId() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/nonce')
      const { nonce } = await res.json()

      const result = await MiniKit.walletAuth({
        nonce,
        statement: 'Sign in to Dollin',
        expirationTime: new Date(Date.now() + 1000 * 60 * 60),
      })

      if (result.executedWith === 'fallback') return

      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: result.data, nonce }),
      })

      const { isValid } = await verifyRes.json()
      if (isValid) {
        router.push('/chats')
      } else {
        setError('인증에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-dvh flex flex-col bg-background">
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
        <Image src="/bigdoll.webp" alt="World" width={110} height={132} priority />
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">World</h1>
          <p className="text-sm text-muted leading-relaxed">
            Share your worries anonymously.<br />
            Someone out there is listening.
          </p>
        </div>
      </div>

      <div className="px-6 pb-12 flex flex-col gap-3">
        <button
          onClick={handleWorldId}
          disabled={loading}
          className="w-full bg-primary text-foreground font-bold py-4 rounded-2xl text-[15px] disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Continue with World ID'}
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          onClick={() => router.push('/chats')} // 개발용 임시 — 나중에 지우기
          className="w-full text-muted text-[13px] py-2"
        >
          Browse anonymously
        </button>
      </div>
    </div>
  )
}
