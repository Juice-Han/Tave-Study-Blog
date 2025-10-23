import { useState } from 'react'
import axios from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post('/posts', { title, content })
    navigate('/')
  }

  return (
    <div className='max-w-2xl mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>새 글 작성</h1>
      <form
        onSubmit={handleSubmit}
        className='space-y-4'
      >
        <input
          className='w-full border p-2 rounded'
          placeholder='제목'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className='w-full border p-2 rounded h-60'
          placeholder='내용'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className='bg-blue-500 text-white px-4 py-2 rounded'>
          등록
        </button>
      </form>
    </div>
  )
}
