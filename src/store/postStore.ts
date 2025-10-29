import { create } from 'zustand'

interface Post {
  id: number
  title: string
  content?: string
  created_at: string
  updated_at?: string
  author: {
    id: number
    username: string
  }
}

interface PostStore {
  posts: Post[] | null
  changePosts: (posts: Post[] | null) => void
  editPost: (postId: number, title: string, content: string) => void
}

export const usePostStore = create<PostStore>()((set) => ({
  posts: null,
  changePosts: (posts: Post[] | null) => set({ posts }),
  editPost: (postId: number, title: string, content: string) =>
    set((state) => {
      if (!state.posts) return state

      const updatedPosts = state.posts.map((post) =>
        post.id === postId ? { ...post, title, content } : post,
      )

      return { posts: updatedPosts }
    }),
}))
