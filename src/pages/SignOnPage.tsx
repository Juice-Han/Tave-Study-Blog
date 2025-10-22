import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const SignOnPage = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== passwordCheck) {
      alert('비밀번호를 다시 확인해주세요.')
      return
    }

    // 실제 API 엔드포인트로 교체해야 합니다.
    const API_ENDPOINT = 'https://juicehan.shop/api/auth/register'

    try {
      const response = await axios.post(API_ENDPOINT, {
        email: email,
        username: username,
        password: password,
      })

      console.log('회원가입 성공:', response.data)
      // 회원가입 성공 시 로직 (예: 로그인 페이지로 이동)
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.')
      navigate('/login') // 로그인 페이지로 리디렉션
    } catch (error) {
      console.error('회원가입 실패:', error)
      // 에러 처리 로직 (예: 이메일 중복 등)
      alert('회원가입에 실패했습니다. 입력 정보를 확인해주세요.')
    }
  }

  return (
    <div className='w-full max-w-md bg-white rounded-lg shadow-md p-8 mt-20'>
      <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
        회원가입
      </h2>
      <form onSubmit={handleSubmit}>
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
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            유저명
          </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
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
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='passwordCheck'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            비밀번호 확인
          </label>
          <input
            type='password'
            id='passwordCheck'
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          회원가입
        </button>
      </form>
      <p className='text-sm text-center text-gray-600 mt-4'>
        이미 계정이 있으신가요?{' '}
        <Link
          to='/login'
          className='text-blue-600 hover:underline font-medium'
        >
          로그인
        </Link>
      </p>
    </div>
  )
}

export default SignOnPage
