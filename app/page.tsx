'use client'

// 로그인 플로우
// 1. MiniKit.commandsAsync.walletAuth({ nonce }) — World ID SDK 사용
// 2. 서명된 payload를 POST /api/auth/verify 로 전달
// 3. 서버에서 proof 검증 + 세션 쿠키 발급
// 4. router.push('/chats') 로 이동

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  async function handleWorldId() {
    // TODO: const { finalPayload } = await MiniKit.commandsAsync.walletAuth({ nonce: uuid() })
    // TODO: await fetch('/api/auth/verify', { method: 'POST', body: JSON.stringify(finalPayload) })
    // TODO: router.push('/chats')
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
          className="w-full bg-primary text-foreground font-bold py-4 rounded-2xl text-[15px]"
        >
          Continue with World ID
        </button>
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
