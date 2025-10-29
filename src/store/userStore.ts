import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserInfo {
  userId: number | null
  username: string | null
  email: string | null
  isLogin: boolean
  token: string | null
}

interface UserStore {
  userInfo: UserInfo
  changeUserInfo: (updates: Partial<UserInfo>) => void
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: {
        userId: null,
        username: null,
        email: null,
        isLogin: false,
        token: null,
      },
      changeUserInfo: (updates) =>
        set((state) => ({ userInfo: { ...state.userInfo, ...updates } })),
      logout: () => {
        set(() => ({
          userInfo: {
            userId: null,
            username: null,
            email: null,
            isLogin: false,
            token: null,
          },
        }))
      },
    }),
    { name: 'user-storage' },
  ),
)
