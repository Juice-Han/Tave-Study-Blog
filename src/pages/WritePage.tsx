import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthUser, useAuthIsLoading } from '../store/authStore'

const WritePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const user = useAuthUser()
  const isAuthLoading = useAuthIsLoading() // Zustand의 인증 로딩 상태

  // 인증 상태 확인 및 비로그인 사용자 리디렉션
  useEffect(() => {
    // 인증 상태 확인이 끝났는데도 user가 없으면 로그인 페이지로 보냄
    if (!isAuthLoading && !user) {
      alert('로그인이 필요한 서비스입니다.')
      navigate('/login')
    }
  }, [user, isAuthLoading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      // 🚨 실제 백엔드 API 엔드포인트로 교체해야 합니다.
      // 세션 쿠키는 브라우저가 자동으로 요청에 포함시켜 보냅니다.
      const response = await axios.post(
        'https://juicehan.shop/api/posts',
        {
          title,
          content,
        },
        {
          withCredentials: true,
        },
      )

      // 성공 시 새로 생성된 글의 상세 페이지로 이동
      navigate(`/post/${response.data.postId}`)
    } catch (error) {
      console.error('글 작성에 실패했습니다:', error)
      alert('글 작성 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 인증 로딩 중이거나 로그아웃 상태일 때 렌더링을 막음
  if (isAuthLoading || !user) {
    return <div className='text-center p-8'>페이지를 준비 중입니다...</div>
  }

  return (
    <div className='w-full max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg'>
      <h1 className='text-3xl font-bold mb-6 text-gray-900'>새 글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            제목
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            disabled={isSubmitting}
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='content'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            내용
          </label>
          <textarea
            id='content'
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            disabled={isSubmitting}
          />
        </div>
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors'
        >
          {isSubmitting ? '작성 중...' : '글 작성 완료'}
        </button>
      </form>
    </div>
  )
}

export default WritePage
