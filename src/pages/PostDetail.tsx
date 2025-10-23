import { useEffect, useState } from 'react'
import axios from '../api/axiosInstance'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => setPost(res.data.post))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    await axios.delete(`/posts/${id}`)
    navigate('/')
  }

  if (!post)
    return <div className='text-center mt-10'>게시글을 불러오는 중...</div>

  return (
    <div className='max-w-3xl mx-auto mt-10'>
      <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
      <p className='text-gray-500 mb-4'>작성자: {post.author_username}</p>
      <p className='border-t pt-4 whitespace-pre-line'>{post.content}</p>
      {user?.id === post.author_id && (
        <div className='mt-6 space-x-4'>
          <Link
            to={`/edit/${post.id}`}
            className='bg-yellow-500 text-white px-3 py-1 rounded'
          >
            수정
          </Link>
          <button
            onClick={handleDelete}
            className='bg-red-500 text-white px-3 py-1 rounded'
          >
            삭제
          </button>
        </div>
      )}
    </div>
  )
}
