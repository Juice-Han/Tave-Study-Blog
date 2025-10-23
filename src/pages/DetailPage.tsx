import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

interface Post {
  id: number
  title: string
  content: string
  author_id: number
  author_username: string
}

function DetailPage() {
  const param = useParams()
  const navigator = useNavigate()
  const context = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState<Post | null>(null)
  if (!context) {
    throw new Error('UserContext must be used within a UserProvider')
  }
  const { userInfo } = context
  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const res = await axios.get(
          `https://juicehan.shop/api/posts/${param.id}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          },
        )
        setPost(res.data.post)
      } catch (e) {
        console.log(e)
        alert('글을 불러오던 중 에러가 발생했습니다.')
        navigator('/')
      } finally {
        setIsLoading(false)
      }
    }
    getPostDetail()
  }, [])
  if (isLoading) {
    return (
      <div>
        <p>글 목록을 불러오고 있습니다.</p>
      </div>
    )
  }
  return (
    <>
      {post ?
        <div>
          <div>
            <p>제목: {post?.title}</p>
            <p>내용: {post?.content}</p>
            <p>작성자: {post?.author_username}</p>
          </div>
          <button
            onClick={() => navigator('/')}
            className='text-green-700'
          >
            글 목록 보기
          </button>
        </div>
      : <div>
          <p>해당 글이 존재하지 않습니다.</p>
          <button onClick={() => navigator('/')}>글 목록 보기</button>
        </div>
      }
    </>
  )
}

export default DetailPage
