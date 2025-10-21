import { useState } from 'react'
// import axios from 'axios'; // 스토어에서 처리하므로 더 이상 필요 X
import { Link, useNavigate } from 'react-router-dom'
import { useAuthActions } from '../store/authStore' // 1. 스토어 액션 임포트

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // (선택) 컴포넌트 자체의 로딩 상태 (버튼 비활성화 등)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuthActions() // 2. zustand의 login 액션 가져오기

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 3. 스토어의 login 액션 호출
      await login(email, password)

      // 4. 성공 시 메인 페이지로 이동
      // (스토어 상태는 login 액션 내부에서 이미 업데이트됨)
      navigate('/')
    } catch (error) {
      // 5. 실패 시 (스토어 액션이 throw한 에러)
      console.error('로그인 실패:', error)
      alert('이메일 또는 비밀번호가 올바르지 않습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='w-full max-w-md bg-white rounded-lg shadow-md p-8 mt-20'>
      <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
        로그인
      </h2>
      <form onSubmit={handleSubmit}>
        {/* ... (이메일, 비밀번호 input 태그들 - 이전 코드와 동일) ... */}
        {/* 이메일 입력 */}
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            이메일
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting} // 로딩 중 비활성화
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
        {/* 비밀번호 입력 */}
        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            비밀번호
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting} // 로딩 중 비활성화
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>

        <button
          type='submit'
          disabled={isSubmitting} // 6. 로딩 중일 때 버튼 비활성화
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400'
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>
      <p className='text-sm text-center text-gray-600 mt-4'>
        계정이 없으신가요?{' '}
        <Link
          to='/signOn'
          className='text-blue-600 hover:underline font-medium'
        >
          회원가입
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
