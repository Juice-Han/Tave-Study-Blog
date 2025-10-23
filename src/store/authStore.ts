import { create } from 'zustand'
import axios from '../api/axiosInstance'

interface User {
  id: number
  username: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,

  login: async (username, password) => {
    set({ loading: true })
    try {
      const res = await axios.post('/auth/login', { username, password })
      localStorage.setItem('token', res.data.token)
      set({ user: res.data.user, token: res.data.token })
    } finally {
      set({ loading: false })
    }
  },

  register: async (username, email, password) => {
    await axios.post('/auth/register', { username, email, password })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const res = await axios.get('/auth/me')
      set({ user: res.data.user })
    } catch {
      localStorage.removeItem('token')
      set({ user: null, token: null })
    }
  },
}))
