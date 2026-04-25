// GET /api/pay-reference
// 결제용 one-time nonce 발급 — 클라이언트가 MiniKit.pay()의 reference로 사용
// 서버에서 발급 후 저장, extend 라우트에서 검증 후 삭제 (replay attack 방지)

import { NextResponse } from 'next/server'
import { pendingReferences } from '@/shared/lib/coin-store'

export async function GET() {
  const reference = crypto.randomUUID().replace(/-/g, '')
  pendingReferences.add(reference)
  // 10분 후 자동 만료
  setTimeout(() => pendingReferences.delete(reference), 10 * 60 * 1000)
  return NextResponse.json({ reference })
}
