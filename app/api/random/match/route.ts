// POST /api/random/match
// body: 없음
// 조건: 온라인 상태(최근 5분 이내 활동) + excludeFromRandom = false + 본인 제외
// 상대 없으면 404 반환
// 매칭 성공 시 두 유저 사이 채팅방 생성 (이미 있으면 기존 방 반환)
// return: { roomId }

export async function POST() {}
