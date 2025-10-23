import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProvider from './providers/UserProvider'
import type { UserInfo } from './contexts/UserContext'
import PostProvider from './providers/PostProvider'
import type { Post } from './contexts/PostContext'
import HomePageWrappedByErrorBoundary from './pages/HomePageWrappedByErrorBoundary'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const WritePage = lazy(() => import('./pages/WritePage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))
const EditPage = lazy(() => import('./pages/EditPage'))

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
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route
                  path='/'
                  element={<HomePageWrappedByErrorBoundary />}
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
            </Suspense>
          </BrowserRouter>
        </PostProvider>
      </UserProvider>
    </>
  )
}

export default App
