import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { usePostStore } from '../store/postStore'

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
  const posts = usePostStore((state) => state.posts)
  const changePosts = usePostStore((state) => state.changePosts)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const getPosts = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get('http://localhost:3000/api/posts')
      changePosts(res.data.posts)
    } catch (e) {
      console.log(e)
      setError(e as AxiosError)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getPosts()
  }, [])

  const renderContent = () => {
    if (isLoading) {
      return <p>글을 불러오는 중</p>
    }

    if (error) {
      return <div>게시글을 불러오는 중 에러가 발생했습니다.</div>
    }

    if (!posts || posts.length === 0) {
      return <div>작성된 글이 존재하지 않습니다.</div>
    }

    return posts.map((post: PostResponse) => (
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
    ))
  }

  return (
    <>
      <div>
        <button
          onClick={() => navigator('/posts/write')}
          className='text-blue-500'
        >
          글 작성하기
        </button>
      </div>
      {renderContent()}
    </>
  )
}

export default HomePage
