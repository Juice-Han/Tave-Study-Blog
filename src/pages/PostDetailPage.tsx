import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import type { Post } from '../types'

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!postId) return

    const fetchPost = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`/api/posts/${postId}`)
        setPost(response.data)
        setError(null)
      } catch (err) {
        console.error(`ID ${postId} 글을 불러오는 데 실패했습니다:`, err)
        setError('해당 글을 찾을 수 없거나 불러오는 데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  if (isLoading) {
    return <div className='text-center p-8'>글을 불러오는 중...</div>
  }

  if (error) {
    return <div className='text-center p-8 text-red-500'>{error}</div>
  }

  if (!post) {
    return <div className='text-center p-8'>게시글이 존재하지 않습니다.</div>
  }

  return (
    <div className='w-full max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-md rounded-lg'>
      <header className='mb-8 border-b pb-6'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight'>
          {post.title}
        </h1>
        <div className='mt-4 flex items-center text-sm text-gray-500'>
          {/* author.username -> author_username */}
          <span>작성자: {post.author_username}</span>
          <span className='mx-2'>·</span>
          {/* createdAt -> created_at */}
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </header>

      <article className='prose lg:prose-xl max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap'>
        {post.content}
      </article>

      <div className='mt-12 border-t pt-6'>
        <Link
          to='/'
          className='text-blue-600 hover:underline font-semibold'
        >
          &larr; 목록으로 돌아가기
        </Link>
      </div>
    </div>
  )
}

export default PostDetailPage
