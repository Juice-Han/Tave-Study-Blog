import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface WritePostPayload {
  title: string
  content: string
}

function WritePage() {
  const userInfo = useUserStore((state) => state.userInfo)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigator = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: writePost, isPending: isWriting } = useMutation({
    mutationFn: async (payload: WritePostPayload) => {
      return axios.post('http://localhost:3000/api/posts', payload, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
    },
    onSuccess: () => {
      alert('글 작성을 성공적으로 완료했습니다.')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigator('/')
    },
    onError: (error) => {
      console.log(error)
      alert('글 작성 중 오류가 발생했습니다.')
    },
  })

  const handleSubmit = () => {
    if (isWriting) return // 중복 제출 방지
    writePost({ title, content })
  }

  return (
    <>
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
          id='title'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='border'
        />
      </div>
      <button
        onClick={handleSubmit}
        className='text-blue-900'
        disabled={isWriting}
      >
        {isWriting ? '작성 중' : '작성'}
      </button>
      <br />
      <button
        onClick={() => navigator('/')}
        className='text-red-500'
        disabled={isWriting}
      >
        취소
      </button>
    </>
  )
}

export default WritePage
