import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { PostResponse } from './DetailPage'
import api from '../lib/axios'

interface EditPostPayload {
  title: string
  content: string
}

function EditPage() {
  // const posts = usePostStore((state) => state.posts)
  const userInfo = useUserStore((state) => state.userInfo)
  const navigator = useNavigate()
  const { id: postId } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery<PostResponse>({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const res = await api.get(`http://localhost:3000/api/posts/${postId}`)
      return res.data.post
    },
    enabled: !!postId,
  })

  useEffect(() => {
    if (post && post.author.id === userInfo.userId) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [post, userInfo.userId])

  const { mutate: editPost, isPending: isEditing } = useMutation({
    mutationFn: async (payload: EditPostPayload) => {
      return api.put(`http://localhost:3000/api/posts/${postId}`, payload, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
    },
    onSuccess: () => {
      alert('글이 성공적으로 수정되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: true })
      queryClient.invalidateQueries({ queryKey: ['posts', postId] })
      navigator(`/posts/${postId}`)
    },
    onError: (error) => {
      console.log(error)
      alert('글 수정 중 오류가 발생했습니다.')
    },
  })

  const handleSubmit = () => {
    if (isEditing) return // 중복 제출 방지
    editPost({ title, content })
  }

  if (isLoading) {
    return <p>수정할 글을 불러오는 중입니다...</p>
  }

  if (isError) {
    return <p>글을 불러오는 중 에러 발생: {error.message}</p>
  }

  // 존재하지 않는 postId일 경우
  if (!post) {
    return <p>글을 찾을 수 없습니다.</p>
  }

  // 본인 글이 아닐 경우 수정 방지
  if (post.author.id !== userInfo.userId) {
    alert('수정 권한이 없습니다.')
    return (
      <Navigate
        to={'/'}
        replace
      />
    )
  }

  return (
    <div>
      <div>
        <label htmlFor='title'>제목</label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border'
        />
      </div>
      <div>
        <label htmlFor='content'>내용</label>
        <textarea
          id='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='border'
        />
      </div>
      <div>
        <button
          className='text-green-700'
          onClick={handleSubmit}
          disabled={isEditing}
        >
          {isEditing ? '수정 중' : '수정'}
        </button>
        <button
          onClick={() => navigator(`/posts/${postId}`)}
          className='text-red-600'
          disabled={isEditing}
        >
          취소
        </button>
      </div>
    </div>
  )
}

export default EditPage
