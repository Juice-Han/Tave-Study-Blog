import React from 'react'
import { PostContext, type PostContextType } from '../contexts/PostContext'

function PostProvider({
  posts,
  children,
}: {
  posts: PostContextType
  children: React.ReactNode
}) {
  return <PostContext value={posts}>{children}</PostContext>
}

export default PostProvider
