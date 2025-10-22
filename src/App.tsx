import { Route, Routes, useNavigate } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import SignOnPage from './pages/SignOnPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import WritePage from './pages/WritePage'
import PostDetailPage from './pages/PostDetailPage'

function App() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get('https://juicehan.shop/api/auth/me')
        console.log('사용자 정보', res.data)
        setUserName(res.data)
      } catch (error) {
        const err = error as AxiosError
        if (err.response?.status === 401) {
          console.warn('401 Unauthorized - 로그인 필요')
          navigate('/login')
        } else {
          console.error('요청 실패:', err.message)
        }
      }
    }
    checkLogin()
  }, [])

  return (
    <DefaultLayout>
      <Routes>
        <Route
          path='/signOn'
          element={<SignOnPage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/write'
          element={<WritePage />}
        />
        <Route
          path='/post/:postId'
          element={<PostDetailPage />}
        />
      </Routes>
    </DefaultLayout>
  )
}

export default App
