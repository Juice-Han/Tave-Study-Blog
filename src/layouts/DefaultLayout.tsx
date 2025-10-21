import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  useAuthUser,
  useAuthActions,
  useAuthIsLoading,
} from '../store/authStore' // 1. 스토어 훅 임포트

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  // 2. Zustand 스토어에서 상태와 액션을 가져옵니다.
  const user = useAuthUser() // 현재 로그인된 사용자 정보 (user 또는 null)
  const isLoading = useAuthIsLoading() // 현재 인증 상태 확인 중인지 (true 또는 false)
  const { logout, checkAuthStatus } = useAuthActions() // 액션 가져오기

  // 3. 앱이 처음 마운트될 때 1회만 인증 상태를 확인합니다.
  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus]) // 의존성 배열에 checkAuthStatus 추가

  // 4. 로그아웃 핸들러
  const handleLogout = () => {
    logout() // 스토어의 logout 액션 호출
    navigate('/login') // 로그아웃 후 로그인 페이지로 이동
  }

  // 5. (중요) 인증 상태 확인 중일 때 로딩 화면 표시
  // 이게 없으면, 로그인한 사용자가 새로고침 시 "로그인" 버튼이 잠깐 보였다가 "로그아웃"으로 바뀌는 현상(Flicker)이 발생합니다.
  if (isLoading) {
    return (
      <div className='w-full h-screen bg-gray-50 flex justify-center items-center'>
        <p className='text-lg text-gray-700'>로딩 중...</p>
        {/* 또는 스피너 컴포넌트 */}
      </div>
    )
  }

  // 6. 로딩이 끝난 후 실제 레이아웃 렌더링
  return (
    <div className='w-full h-screen bg-gray-50 flex flex-col'>
      {/* --- 헤더 영역 --- */}
      <header className='w-full bg-white shadow-md p-4 flex justify-between items-center z-10'>
        <div>
          <Link
            to='/'
            className='text-xl font-bold text-blue-600 hover:text-blue-700'
          >
            MyBlog
          </Link>
        </div>
        <nav>
          {/* 7. user 상태(isLoggedIn)에 따라 조건부 렌더링 */}
          {
            user ?
              // 1. 로그인 상태일 때: 로그아웃 버튼
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              >
                로그아웃 {user.username} {/* 사용자 이름 표시 (선택) */}
              </button>
              // 2. 로그아웃 상태일 때: 로그인 버튼
            : <Link
                to='/login'
                className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                로그인
              </Link>

          }
        </nav>
      </header>

      {/* --- 메인 컨텐츠 영역 --- */}
      <main className='w-full flex-grow flex justify-center items-start p-4 overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}

export default DefaultLayout
