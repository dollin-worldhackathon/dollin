// In-memory store — DB 연결 전 단계. 서버 재시작 시 초기화됨.
// reference: 결제 nonce (서버 발급 → 사용 후 삭제, replay attack 방지)

export const DEFAULT_MSG_LIMIT = 50

export type CoinTransaction = {
  id: string
  type: 'extend'
  amount: number
  roomId: string
  txId: string
  timestamp: string
}

export const msgLimits = new Map<string, number>()             // roomId → limit
export const coinHistory = new Map<string, CoinTransaction[]>() // address → txs
export const pendingReferences = new Set<string>()             // one-time pay nonces

export function getMsgLimit(roomId: string) {
  return msgLimits.get(roomId) ?? DEFAULT_MSG_LIMIT
}

export function extendMsgLimit(roomId: string, amount: number) {
  const current = getMsgLimit(roomId)
  msgLimits.set(roomId, current + amount)
  return current + amount
}

export function recordPayment(address: string, tx: CoinTransaction) {
  const history = coinHistory.get(address) ?? []
  coinHistory.set(address, [tx, ...history])
}
