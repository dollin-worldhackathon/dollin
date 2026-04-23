// GET /api/community/posts
// query: category (없거나 'all'이면 전체), page (default 1), q (검색어, 없으면 전체)
// return: { posts: { id, category, author, authorMeta, title, preview, time }[], total }

// POST /api/community/posts
// body: { title, content, category }
// 세션에서 userId 추출, author는 익명 닉네임 자동 생성
// return: { post: { id, category, author, title, preview, time } }

export async function GET() {}
export async function POST() {}
