import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuthUser } from '../store/authStore'
import type { Post } from '../types'

// 게시글 카드를 위한 별도 컴포넌트 (수정됨)
const PostCard = ({ post }: { post: Post }) => (
  <div className='bg-white shadow-md rounded-lg p-6 transition-transform transform hover:-translate-y-1'>
    <h2 className='text-2xl font-bold text-gray-800 mb-2'>{post.title}</h2>
    <p className='text-gray-600 mb-4'>
      {/* author.username -> author_username */}
      작성자: {post.author_username}
    </p>
    <p className='text-sm text-gray-500 mb-4'>
      {/* createdAt -> created_at. 'YYYY-MM-DD HH:MM:SS' 형식도 Date 객체가 파싱 가능 */}
      {new Date(post.created_at).toLocaleDateString()}
    </p>
    <p className='text-gray-700 leading-relaxed truncate'>
      {post.content.substring(0, 100)}...
    </p>
    <Link
      to={`/post/${post.id}`}
      className='text-blue-600 hover:underline font-semibold mt-4 inline-block'
    >
      더 읽기 &rarr;
    </Link>
  </div>
)

// HomePage 컴포넌트의 나머지 부분은 이전과 동일합니다.
const HomePage = () => {
  const user = useAuthUser()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('https://juicehan.shop/api/posts')
        setPosts(response.data.posts)
        setError(null)
      } catch (err) {
        console.error('게시글을 불러오는 데 실패했습니다:', err)
        setError('게시글을 불러올 수 없습니다. 나중에 다시 시도해주세요.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold text-gray-900'>블로그</h1>
        {user && (
          <Link
            to='/write'
            className='bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
          >
            새 글 작성
          </Link>
        )}
      </div>

      {isLoading && (
        <p className='text-center text-gray-500'>게시글을 불러오는 중...</p>
      )}
      {error && <p className='text-center text-red-500'>{error}</p>}

      {!isLoading && !error && (
        <div className='grid gap-8 md:grid-cols-1'>
          {posts.length > 0 ?
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))
          : <p className='text-center text-gray-500'>
              아직 작성된 글이 없습니다.
            </p>
          }
        </div>
      )}
    </div>
  )
}

export default HomePage
