// POST /api/auth/verify
// body: { payload } — MiniKit.commandsAsync.walletAuth 결과값
// 1. World ID proof 검증
// 2. walletAddress 기준으로 유저 조회 or 신규 생성
// 3. 세션 쿠키 발급
// return: { ok: true }

export async function POST() {}
