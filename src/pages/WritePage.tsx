import axios from 'axios'
import { useState } from 'react'
import { useUserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function WritePage() {
  const context = useUserContext()
  const { userInfo } = context
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigator = useNavigate()
  const writePost = async () => {
    try {
      await axios.post(
        'https://juicehan.shop/api/posts',
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
      alert('글 작성을 완료했습니다.')
      navigator('/')
    } catch (e) {
      console.log(e)
      alert('글을 작성하는 도중 오류가 발생했습니다.')
    }
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
        onClick={writePost}
        className='text-blue-900'
      >
        작성
      </button>
      <br />
      <button
        onClick={() => navigator('/')}
        className='text-red-500'
      >
        취소
      </button>
    </>
  )
}

export default WritePage
