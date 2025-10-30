import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePageWrappedByErrorBoundary from './pages/HomePageWrappedByErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import { useUserStore } from './store/userStore'
import DefualtLayout from './layouts/DefaultLayout'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const WritePage = lazy(() => import('./pages/WritePage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))
const EditPage = lazy(() => import('./pages/EditPage'))

function App() {
  const { isLogin } = useUserStore((state) => state.userInfo)
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path='/login'
              element={<LoginPage />}
            />
            <Route
              path='/register'
              element={<RegisterPage />}
            />
            <Route element={<DefualtLayout />}>
              <Route
                path='/'
                element={
                  <ProtectedRoute
                    isAuthenticated={isLogin}
                    element={<HomePageWrappedByErrorBoundary />}
                  />
                }
              />
              <Route path='/posts'>
                <Route
                  path='write'
                  element={
                    <ProtectedRoute
                      isAuthenticated={isLogin}
                      element={<WritePage />}
                    />
                  }
                />
                <Route
                  path=':id'
                  element={
                    <ProtectedRoute
                      isAuthenticated={isLogin}
                      element={<DetailPage />}
                    />
                  }
                />
                <Route
                  path='edit/:id'
                  element={
                    <ProtectedRoute
                      isAuthenticated={isLogin}
                      element={<EditPage />}
                    />
                  }
                />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
