import { useNavigate, useParams } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../lib/axios'

export interface PostResponse {
  id: number
  title: string
  content: string
  author: {
    id: number
    username: string
  }
  created_at: string
  updated_at: string
}

function DetailPage() {
  const { id: postId } = useParams()
  const navigator = useNavigate()
  const userInfo = useUserStore((state) => state.userInfo)
  const queryClient = useQueryClient()
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery<PostResponse>({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const res = await api.get(`http://localhost:3000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      return res.data.post
    },
  })

  const goEditPage = (postId: number) => {
    navigator(`/posts/edit/${postId}`)
  }

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      return api.delete(`http://localhost:3000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
    },
    onSuccess: () => {
      alert('글이 성공적으로 삭제되었습니다.')

      // 기존에 저장되어 있던 ['posts']와 ['posts', postId] 키의 캐싱 데이터를 stale(오래된) 상태로 만든다.
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: true })
      queryClient.invalidateQueries({ queryKey: ['posts', postId] })
      navigator('/')
    },
    onError: (error) => {
      console.log(error)
      alert('글 삭제 중 오류가 발생했습니다.')
    },
  })

  if (isLoading) {
    return <p>글을 불러오고 있습니다</p>
  }
  if (isError) {
    return <p>게시글을 불러오는 중 에러가 발생했습니다.: {error.message}</p>
  }
  if (!post) {
    return (
      <div>
        <p>해당 게시글이 존재하지 않습니다.</p>
        <button onClick={() => navigator('/')}>글 목록 보기</button>
      </div>
    )
  }
  return (
    <>
      <div>
        <div>
          <p>제목: {post.title}</p>
          <p>내용: {post.content}</p>
          <p>작성자: {post.author.username}</p>
        </div>
        <div>
          {userInfo.userId === post.author.id && (
            <div>
              <button
                onClick={() => goEditPage(post.id)}
                className='text-green-700'
              >
                수정
              </button>
              <button
                onClick={() => deletePost()}
                className='text-red-600'
                disabled={isDeleting}
              >
                {isDeleting ? '삭제 중' : '삭제'}
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
    </>
  )
}

export default DetailPage
