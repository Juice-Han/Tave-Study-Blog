import { useContext } from 'react'
import { PostContext } from '../contexts/PostContext'

export function usePostContext() {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider')
  }
  return context
}
