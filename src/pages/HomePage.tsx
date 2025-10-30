import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '../lib/axios'

interface PostResponse {
  id: number
  title: string
  author: {
    id: number
    username: string
  }
  created_at: string
}

function HomePage() {
  const navigator = useNavigate()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await api.get('http://localhost:3000/api/posts')
      return res.data.posts as PostResponse[]
    },
  })

  if (isLoading) return <p>글을 불러오는 중</p>
  if (isError)
    return <p>게시글을 불러오는 중 에러가 발생했습니다.: {error.message}</p>
  if (!data || data.length === 0) return <p>작성된 글이 존재하지 않습니다.</p>

  return (
    <>
      <button
        onClick={() => navigator('/posts/write')}
        className='text-blue-500'
      >
        글 작성하기
      </button>
      {data.map((post) => (
        <div
          key={post.id}
          className='border mb-3'
          onClick={() => navigator(`/posts/${post.id}`)}
        >
          <p className='text-xl'>{post.title}</p>
          <p>작성자: {post.author.username}</p>
          <p>
            생성일:{' '}
            {new Date(post.created_at.replace(' ', 'T') + 'Z').toLocaleString(
              'ko-KR',
            )}
          </p>
        </div>
      ))}
    </>
  )
}

export default HomePage
