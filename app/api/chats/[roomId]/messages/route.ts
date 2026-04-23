// GET /api/chats/[roomId]/messages
// params: roomId
// query: after (마지막으로 받은 messageId, 없으면 전체 반환)
// 롱폴링: 새 메시지 없으면 최대 20초 대기 후 빈 배열 반환
// return: { messages: { id, senderId, text, type: 'text'|'image', imageUrl?, createdAt }[] }

// POST /api/chats/[roomId]/messages
// params: roomId
// body: { text } or { type: 'image', imageUrl }
// msgCount >= msgLimit 이면 403 반환
// return: { message: { id, senderId, text, type, createdAt } }

export async function GET() {}
export async function POST() {}
