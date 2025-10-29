import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider')
  }
  return context
}
