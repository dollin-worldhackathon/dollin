import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { extendMsgLimit, recordPayment, pendingReferences } from '@/shared/lib/coin-store'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params
  const { amount, payload } = await req.json()

  const cookieStore = await cookies()
  const address = cookieStore.get('session')?.value
  if (!address) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const txId: string = payload?.transactionId ?? payload?.transaction_id
  const reference: string = payload?.reference
  if (!txId || !reference) {
    return NextResponse.json({ error: 'Missing transactionId or reference' }, { status: 400 })
  }

  if (process.env.NODE_ENV !== 'development') {
    // reference가 서버에서 발급한 nonce인지 검증 (replay attack 방지)
    if (!pendingReferences.has(reference)) {
      return NextResponse.json({ error: 'Invalid or expired reference' }, { status: 400 })
    }
    pendingReferences.delete(reference)

    // Worldcoin 결제 검증 (Authorization 헤더 필수)
    const verifyRes = await fetch(
      `https://developer.worldcoin.org/api/v2/minikit/transaction/${txId}?app_id=${process.env.NEXT_PUBLIC_APP_ID}&type=payment`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
        },
      }
    )

    if (!verifyRes.ok) {
      return NextResponse.json({ error: 'Verification request failed' }, { status: 400 })
    }

    const txData = await verifyRes.json()

    if (txData.transactionStatus !== 'mined' && txData.transactionStatus !== 'submitted') {
      return NextResponse.json(
        { error: `Payment not confirmed: ${txData.transactionStatus}` },
        { status: 400 }
      )
    }
  }

  const newLimit = extendMsgLimit(roomId, amount)

  recordPayment(address, {
    id: crypto.randomUUID(),
    type: 'extend',
    amount,
    roomId,
    txId,
    timestamp: new Date().toISOString(),
  })

  return NextResponse.json({ msgLimit: newLimit })
}
