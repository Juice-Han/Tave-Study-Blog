import type React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  element: React.ReactElement
  isAuthenticated: boolean
}

export default function ProtectedRoute({
  element,
  isAuthenticated,
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return (
      // 렌더링 도중 다른 주소로 라우팅을 시켜야할 때 Navigate 컴포넌트를 사용
      <Navigate
        to='/login'
        replace
      />
    )
  }

  return element
}
