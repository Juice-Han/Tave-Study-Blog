import axios from 'axios'
import { useUserStore } from '../store/userStore'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().userInfo.token

    // userStore에 token이 있다면 token을 헤더에 담아서 요청
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },

  (error) => {
    //서버가 응답한 에러라면 error.response가 존재. 그렇지 않으면 undefined
    if (error.response && error.response.status === 401) {
      useUserStore.getState().logout()
      alert('세션이 만료되었습니다. 다시 로그인해 주세요.')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default api
