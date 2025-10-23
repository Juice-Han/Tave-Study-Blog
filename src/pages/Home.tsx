import { useEffect, useState } from 'react'
import axios from '../api/axiosInstance'
import { Link } from 'react-router-dom'

interface Post {
  id: number
  title: string
  author_username: string
  created_at: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/posts')
      .then((res) => setPosts(res.data.posts))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className='text-center mt-10'>로딩 중...</div>

  return (
    <div className='max-w-3xl mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-6'>전체 게시글</h1>
      <ul className='space-y-4'>
        {posts.map((post) => (
          <li
            key={post.id}
            className='border p-4 rounded-lg hover:bg-gray-50'
          >
            <Link
              to={`/posts/${post.id}`}
              className='font-semibold text-lg'
            >
              {post.title}
            </Link>
            <p className='text-sm text-gray-500'>
              작성자: {post.author_username}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
