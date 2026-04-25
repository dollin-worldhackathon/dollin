import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { verifySiweMessage } from '@worldcoin/minikit-js/siwe'

type WalletAuthPayload = {
  message: string
  signature: string
  address?: string
  status?: string
}

type RequestBody = {
  payload: WalletAuthPayload
  nonce: string
}

export async function POST(req: NextRequest) {
  const { payload, nonce } = (await req.json()) as RequestBody

  const cookieStore = await cookies()
  const storedNonce = cookieStore.get('siwe')?.value

  if (!storedNonce || nonce !== storedNonce) {
    return NextResponse.json({ isValid: false, error: 'Invalid nonce' }, { status: 400 })
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const verification = await verifySiweMessage(payload as any, nonce)

    if (!verification.isValid) {
      return NextResponse.json({ isValid: false }, { status: 400 })
    }

    const address = verification.siweMessageData.address ?? ''
    cookieStore.delete('siwe')
    cookieStore.set('session', address, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.json({ isValid: true, address })
  } catch (error) {
    return NextResponse.json(
      { isValid: false, error: error instanceof Error ? error.message : 'Verification failed' },
      { status: 400 }
    )
  }
}
