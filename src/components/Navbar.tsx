import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">Tave Blog</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/create">새 글쓰기</Link>
            <button onClick={handleLogout} className="hover:text-red-400">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
          </>
        )}
      </div>
    </nav>
  );
}
