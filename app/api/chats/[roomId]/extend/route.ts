// POST /api/chats/[roomId]/extend
// params: roomId
// body: { amount, payload } — amount: 코인 수량, payload: MiniKit.commandsAsync.pay 결과값
// payload로 온체인 결제 검증
// 검증 성공 시 msgLimit += amount (코인 1개 = 메시지 1개 or 정해진 비율)
// return: { msgLimit } — 업데이트된 한도

export async function POST() {}
