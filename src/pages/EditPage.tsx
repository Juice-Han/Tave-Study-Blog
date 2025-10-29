import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePostStore } from '../store/postStore'
import { useUserStore } from '../store/userStore'

function EditPage() {
  const posts = usePostStore((state) => state.posts)
  const userInfo = useUserStore((state) => state.userInfo)
  const navigator = useNavigate()
  const { id: postId } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (posts && postId) {
      const editedPost = posts.find((post) => post.id === +postId)
      if (editedPost) {
        setTitle(editedPost.title)
        setContent(editedPost.content || '')
      } else {
        alert('수정할 글을 찾을 수 없습니다.')
        navigator('/')
      }
    }
  }, [])

  const editPost = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/posts/${postId}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      alert('글이 성공적으로 수정되었습니다.')
      navigator(`/posts/${postId}`)
    } catch (e) {
      console.log(e)
      alert('글 수정 중 오류가 발생했습니다.')
    }
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
          id='title'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='border'
        />
      </div>
      <div>
        <button
          className='text-green-700'
          onClick={editPost}
        >
          수정 완료
        </button>
        <button
          onClick={() => navigator(`/posts/${postId}`)}
          className='text-red-600'
        >
          취소
        </button>
      </div>
    </div>
  )
}

export default EditPage
