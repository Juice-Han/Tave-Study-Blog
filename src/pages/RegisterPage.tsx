import { useState } from 'react'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
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
      <label htmlFor='password'>비밀번호 확인</label>
      <input
        id='checkPassword'
        value={checkPassword}
        type='checkPassword'
        onChange={(e) => setCheckPassword(e.target.value)}
        className='border'
      />
      <br />
      <button className='text-green-600'>회원가입하기</button>
    </>
  )
}

export default RegisterPage
