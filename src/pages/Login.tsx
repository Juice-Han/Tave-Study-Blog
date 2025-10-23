import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuthStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(username, password)
    navigate('/')
  }

  return (
    <div className='max-w-md mx-auto mt-20 border p-6 rounded-lg shadow'>
      <h1 className='text-xl font-bold mb-4'>로그인</h1>
      <form
        onSubmit={handleSubmit}
        className='space-y-4'
      >
        <input
          className='w-full border p-2 rounded'
          placeholder='아이디'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='w-full border p-2 rounded'
          placeholder='비밀번호'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='w-full bg-blue-500 text-white p-2 rounded'>
          로그인
        </button>
      </form>
    </div>
  )
}
