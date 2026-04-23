// GET /api/chats
// 세션에서 userId 추출
// return: { rooms: { id, title, lastMessage, unreadCount, updatedAt, status: 'active'|'ended' }[] }

// POST /api/chats
// body: { postId }
// 현재 유저 + 글 작성자 사이 채팅방 조회, 없으면 신규 생성
// return: { roomId }

export async function GET() {}
export async function POST() {}
