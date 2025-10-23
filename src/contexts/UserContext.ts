import React from 'react'

export interface UserInfo {
  userId: number | null
  username: string | null
  email: string | null
  isLogin: boolean
  token: string | null
}

export interface UserContextType {
  userInfo: UserInfo
  changeUserInfo: (updates: Partial<UserInfo>) => void
}

export const UserContext = React.createContext<UserContextType | null>(null)
