import React from 'react'
import { UserContext, type UserContextType } from '../contexts/UserContext'

function UserProvider({
  user,
  children,
}: {
  user: UserContextType
  children: React.ReactNode
}) {
  return <UserContext value={user}>{children}</UserContext>
}

export default UserProvider
