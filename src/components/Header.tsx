import { useUserStore } from '../store/userStore'

export default function Header() {
  const userInfo = useUserStore((state) => state.userInfo)
  const logout = useUserStore((state) => state.logout)
  const handleLogout = () => {
    alert('로그아웃 되었습니다.')
    logout()
  }
  return (
    <header className='w-full h-[50px] bg-blue-800 flex justify-between items-center text-white'>
      <p className='text-2xl ms-[20px]'>My Blog</p>
      {userInfo.isLogin ?
        <button
          className='w-[150px] h-[30px] bg-white rounded-xl hover:cursor-pointer'
          onClick={handleLogout}
        >
          <p className='text-red-600'>로그아웃({userInfo.username})</p>
        </button>
      : <p>로그인</p>}
    </header>
  )
}
