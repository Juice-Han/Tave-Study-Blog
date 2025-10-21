import { create } from 'zustand'
import axios from 'axios'

// 1. 스토어에서 관리할 상태의 타입 정의
interface User {
  id: string | number // 백엔드에서 오는 실제 ID 타입
  email: string
  username: string
  // ... 백엔드에서 주는 다른 사용자 정보
}

interface LoginResponse {
  message: string
  user: User
}

interface AuthState {
  user: User | null
  isLoading: boolean // 앱 로드 시 인증 상태 확인 중인지 여부
  actions: {
    checkAuthStatus: () => Promise<void>
    login: (email: string, password: string) => Promise<LoginResponse>
    logout: () => Promise<void>
  }
}

// 2. Zustand 스토어 생성
// create<AuthState>()의 콜백 함수는 'set' 함수를 인자로 받습니다.
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true, // 앱이 로드되면 일단 '로딩 중'으로 설정

  // 3. 'actions' 객체 안에 비동기 함수들을 정의
  actions: {
    /**
     * 앱 로딩 시 실행: 현재 유효한 세션이 있는지 확인합니다.
     * 백엔드에 /api/me 같은 엔드포인트가 필요합니다.
     */
    checkAuthStatus: async () => {
      try {
        // 백엔드에 "내 정보 줘" 요청
        // 쿠키가 유효하면 사용자 정보를, 아니면 401 에러를 반환해야 함
        const response = await axios.get('http://13.209.68.198/api/auth/me') // <-- 🚨 실제 엔드포인트로 변경

        // 성공 시: user 상태 업데이트
        set({ user: response.data, isLoading: false })
      } catch (error) {
        // 실패 시(세션 없음): user를 null로 설정
        set({ user: null, isLoading: false })
      }
    },

    /**
     * 로그인: 이메일, 비밀번호로 로그인을 요청합니다.
     */
    login: async (email, password) => {
      set({ isLoading: true }) // (선택적) 로그인 중 로딩
      try {
        // 백엔드에 로그인 요청 (성공 시 쿠키가 세팅되고 사용자 정보 반환)
        const response = await axios.post(
          'http://13.209.68.198/api/auth/login',
          {
            email,
            password,
          },
        ) // <-- 🚨 실제 엔드포인트로 변경
        const user = response.data as LoginResponse

        // 성공 시: user 상태 업데이트
        set({ user: user.user, isLoading: false })
        return user
      } catch (error) {
        // 실패 시: 에러를 throw하여 컴포넌트에서 처리
        set({ user: null, isLoading: false })
        console.error('로그인 실패:', error)
        throw error
      }
    },

    /**
     * 로그아웃: 백엔드에 세션 파기를 요청합니다.
     */
    logout: async () => {
      try {
        // 백엔드에 로그아웃 요청 (세션 파기 및 쿠키 삭제)
        await axios.post('http://13.209.68.198/api/auth/logout') // <-- 🚨 실제 엔드포인트로 변경
      } catch (error) {
        console.error('로그아웃 API 호출 실패:', error)
      } finally {
        // API 호출 성공 여부와 관계없이 프론트엔드 상태를 로그아웃시킴
        set({ user: null, isLoading: false })
      }
    },
  },
}))

// 4. 컴포넌트에서 쉽게 사용할 수 있도록 커스텀 훅 export
// 상태(state)와 행동(actions)을 분리해서 사용하면 편리합니다.
export const useAuthUser = () => useAuthStore((state) => state.user)
export const useAuthIsLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthActions = () => useAuthStore((state) => state.actions)

export default useAuthStore
