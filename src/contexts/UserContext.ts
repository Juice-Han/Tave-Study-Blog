import { createContext } from 'react'

export interface UserInfo {
  userId: number | null
  username: string | null
  isLogin: boolean
  token: string | null
}

export interface UserContextType {
  userInfo: UserInfo
  changeUserInfo: (updates: Partial<UserInfo>) => void
  logout: () => void
}

export const UserContext = createContext<UserContextType | null>(null)
