import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'
import axios, { AxiosError } from 'axios'
import { usePostContext, type Post } from '../contexts/PostContext'

function HomePage() {
  if (Math.random() > 0.8) {
    throw new Error('App 컴포넌트에서 에러 발생')
  }
  const userContext = useUserContext()
  const postContext = usePostContext()
  const navigator = useNavigate()
  const { userInfo, logout } = userContext
  const { posts, changePosts } = postContext
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const getPosts = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get('https://juicehan.shop/api/posts', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      changePosts(res.data.posts)
    } catch (e) {
      console.log(e)
      setError(e as AxiosError)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (!userInfo.isLogin) {
      navigator('/login')
      return
    }
    getPosts()
  }, [userInfo])

  const logoutHandler = () => {
    logout()
    changePosts(null)
    navigator('/login')
  }

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

    return posts.map((post: Post) => (
      <div
        key={post.id}
        className='border mb-3'
        onClick={() => navigator(`/posts/${post.id}`)}
      >
        <p className='text-xl'>{post.title}</p>
        <p>작성자: {post.author_username}</p>
        <p>
          생성일:{' '}
          {new Date(post.created_at.replace(' ', 'T') + 'Z').toLocaleString(
            'ko-KR',
          )}
        </p>
        <p>
          수정일:{' '}
          {new Date(post.updated_at.replace(' ', 'T') + 'Z').toLocaleString(
            'ko-KR',
          )}
        </p>
      </div>
    ))
  }

  return (
    <>
      <div>
        {userInfo.isLogin && (
          <button
            onClick={logoutHandler}
            className='bg-red-400'
          >
            로그아웃({userInfo.username})
          </button>
        )}
      </div>
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
