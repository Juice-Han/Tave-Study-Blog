import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProvider from './providers/UserProvider'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import type { UserInfo } from './contexts/UserContext'
import WritePage from './pages/WritePage'
import DetailPage from './pages/DetailPage'
import PostProvider from './providers/PostProvider'
import type { Post } from './contexts/PostContext'
import EditPage from './pages/EditPage'

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: null,
    username: null,
    isLogin: false,
    token: null,
  })

  const changeUserInfo = (updates: Partial<UserInfo>) => {
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...updates }))
  }

  const [posts, setPosts] = useState<Post[] | null>(null)

  const changePosts = (posts: Post[] | null) => {
    setPosts(posts)
  }

  const logout = () => {
    changePosts(null)
    changeUserInfo({
      userId: null,
      username: null,
      isLogin: false,
      token: null,
    })
  }

  return (
    <>
      <UserProvider user={{ userInfo, changeUserInfo, logout }}>
        <PostProvider posts={{ posts, changePosts }}>
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={<HomePage />}
              />
              <Route
                path='/login'
                element={<LoginPage />}
              />
              <Route
                path='/register'
                element={<RegisterPage />}
              />
              <Route
                path='/posts/write'
                element={<WritePage />}
              />
              <Route
                path='/posts/:id'
                element={<DetailPage />}
              />
              <Route
                path='/posts/edit/:id'
                element={<EditPage />}
              />
            </Routes>
          </BrowserRouter>
        </PostProvider>
      </UserProvider>
    </>
  )
}

export default App
