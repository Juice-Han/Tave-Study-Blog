import React, { useContext } from 'react'

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

export const UserContext = React.createContext<UserContextType | null>(null)

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider')
  }
  return context
}
