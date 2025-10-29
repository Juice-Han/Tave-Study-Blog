import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePageWrappedByErrorBoundary from './pages/HomePageWrappedByErrorBoundary'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const WritePage = lazy(() => import('./pages/WritePage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))
const EditPage = lazy(() => import('./pages/EditPage'))

function App() {
  return (
    <>
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
    </>
  )
}

export default App
