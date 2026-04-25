import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { coinHistory } from '@/shared/lib/coin-store'

export async function GET() {
  const cookieStore = await cookies()
  const address = cookieStore.get('session')?.value

  if (!address) {
    return NextResponse.json({ transactions: [] })
  }

  const transactions = coinHistory.get(address) ?? []
  return NextResponse.json({ transactions })
}
