import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'

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
  const context = useUserContext()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState<Post | null>(null)
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
        console.log(res.data.post, userInfo)
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

  const editPost = (postId: number) => {
    navigator(`/posts/edit/${postId}`)
  }

  const deletePost = async (postId: number) => {
    try {
      await axios.delete(`https://juicehan.shop/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      alert('글이 성공적으로 삭제되었습니다.')
      navigator('/')
    } catch (e) {
      console.log(e)
      alert('글 삭제 중 오류가 발생했습니다.')
    }
  }
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
            <p>제목: {post.title}</p>
            <p>내용: {post.content}</p>
            <p>작성자: {post.author_username}</p>
          </div>
          <div>
            {userInfo.userId === post.author_id && (
              <div>
                <button
                  onClick={() => editPost(post.id)}
                  className='text-green-700'
                >
                  수정
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className='text-red-600'
                >
                  삭제
                </button>
              </div>
            )}
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
