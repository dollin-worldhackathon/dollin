# Dollin

World App 미니앱 기반 소셜 서비스

---

## 로컬 개발 세팅

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경변수 설정

```bash
cp .env.example .env.local
```

`.env.local`의 내용은 팀 채널에서 공유된 파일을 그대로 사용하세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

---

## World App 테스트 (ngrok)

World App 미니앱은 **HTTPS URL**에서만 동작합니다. ngrok으로 로컬 서버를 외부에 노출해야 합니다.

### ngrok 설치

```bash
# macOS
brew install ngrok

# 또는 https://ngrok.com/download 에서 직접 설치
```

### ngrok 계정 연결 (최초 1회)

1. [ngrok.com](https://ngrok.com) 가입
2. 대시보드에서 Auth Token 복사
3. 아래 명령 실행

```bash
ngrok config add-authtoken <your-token>
```

### 터널 열기

개발 서버(`npm run dev`)가 실행 중인 상태에서 **새 터미널**에 입력:

```bash
ngrok http 3000 --region us
```

출력 예시:
```
Forwarding  https://xxxx-xxxx.ngrok-free.app -> http://localhost:3000
```

### Developer Portal에 URL 등록

1. [developer.worldcoin.org](https://developer.worldcoin.org) 접속
2. 앱 선택 → Mini App URL을 ngrok URL로 변경  
   예: `https://xxxx-xxxx.ngrok-free.app`

### World App에서 접속

- Developer Portal에서 QR 코드 생성 후 스캔
- 또는 World App → 개발자 미니앱 목록에서 직접 접속

> 주의: ngrok 무료 플랜은 재시작할 때마다 URL이 바뀝니다. URL이 바뀌면 Developer Portal에도 다시 등록해야 합니다.

---

## 브랜치 전략

| 브랜치 | 용도 |
|--------|------|
| `main` | 배포 브랜치. push 시 VPS에 자동 배포됨 |
| `feature/*` | 기능 개발 브랜치 |

기능 개발 → PR → 리뷰 → `main` 머지 → 자동 배포
