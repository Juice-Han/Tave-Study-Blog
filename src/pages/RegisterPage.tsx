import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const navigate = useNavigate()
  const register = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password,
      })
      navigate('/login')
    } catch (e) {
      console.log(e)
      alert('회원가입 과정에서 오류가 발생했습니다.')
    }
  }
  return (
    <>
      <label htmlFor='username'>아이디</label>
      <input
        id='username'
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='border'
      />
      <br />
      <label htmlFor='username'>이메일</label>
      <input
        id='email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border'
      />
      <br />
      <label htmlFor='password'>비밀번호</label>
      <input
        id='passowrd'
        value={password}
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        className='border'
      />
      <br />
      <label htmlFor='checkPassword'>비밀번호 확인</label>
      <input
        id='checkPassword'
        value={checkPassword}
        type='password'
        onChange={(e) => setCheckPassword(e.target.value)}
        className='border'
      />
      <br />
      <button
        className='text-green-600'
        onClick={register}
      >
        회원가입하기
      </button>
    </>
  )
}

export default RegisterPage
