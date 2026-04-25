import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createPublicClient, http, formatEther, defineChain } from 'viem'

const worldchain = defineChain({
  id: 480,
  name: 'World Chain',
  nativeCurrency: { name: 'Worldcoin', symbol: 'WLD', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://worldchain-mainnet.g.alchemy.com/public'] },
  },
})

export async function GET() {
  const cookieStore = await cookies()
  const address = cookieStore.get('session')?.value

  if (!address) {
    return NextResponse.json({ balance: '0' })
  }

  try {
    const client = createPublicClient({ chain: worldchain, transport: http() })
    const wei = await client.getBalance({ address: address as `0x${string}` })
    const balance = parseFloat(formatEther(wei)).toFixed(4)
    return NextResponse.json({ balance, address })
  } catch {
    return NextResponse.json({ balance: '0', address })
  }
}
