// NOTE: 아래는 예시 타입이며, 실제 백엔드 API 응답 구조에 맞춰야 합니다.

// 사용자 정보 타입 (authStore에서도 사용 가능)
export interface User {
  id: number
  email: string
  username: string
}

export interface LoginResponse {
  message: string
  user: User
}

// 블로그 게시글 타입
export interface Post {
  id: number
  title: string
  content: string
  created_at: string // 데이터 양식: 2025-10-13 16:05:00
  updated_at: string
  author_username: string // 작성자 Username
}
