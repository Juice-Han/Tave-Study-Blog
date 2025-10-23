import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'

function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/posts/:id'
          element={<PostDetail />}
        />
        <Route
          path='/create'
          element={<CreatePost />}
        />
        <Route
          path='/edit/:id'
          element={<EditPost />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
