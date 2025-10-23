import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'

function LoginPage() {
  const context = useUserContext()
  const { changeUserInfo } = context
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigator = useNavigate()
  const login = async () => {
    if (!username.trim() || !password.trim()) return
    try {
      const res = await axios.post('https://juicehan.shop/api/auth/login', {
        username,
        password,
      })
      if (res.status === 200) {
        const { user, token } = res.data
        console.log(res.data)
        changeUserInfo({
          userId: user.id,
          username: user.username,
          isLogin: true,
          token,
        })
        navigator('/')
      } else {
        alert('아이디와 비밀번호를 다시 확인해주세요.')
      }
    } catch (e) {
      console.log(e)
      alert('로그인 중 오류가 발생했습니다.')
    }
  }
  return (
    <>
      <div>
        <label htmlFor='username'>아이디</label>
        <input
          id='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border'
        />
      </div>
      <div>
        <label htmlFor='password'>비밀번호</label>
        <input
          id='passowrd'
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && login()}
          className='border'
        />
      </div>
      <button
        onClick={login}
        className='bg-blue-300'
      >
        로그인
      </button>
      <p>
        회원이 아니신가요?{' '}
        <Link
          to={'/register'}
          className='text-blue-700'
        >
          회원가입
        </Link>
      </p>
    </>
  )
}

export default LoginPage
