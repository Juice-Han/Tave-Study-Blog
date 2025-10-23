import { createContext } from 'react'

export interface Post {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
  author_username: string
}

export interface PostContextType {
  posts: Post[] | null
  changePosts: (posts: Post[] | null) => void
}

export const PostContext = createContext<PostContextType | null>(null)
