import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuthStore();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form.username, form.email, form.password);
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-20 border p-6 rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">회원가입</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" className="w-full border p-2 rounded" placeholder="아이디" value={form.username} onChange={handleChange} />
        <input name="email" className="w-full border p-2 rounded" placeholder="이메일" value={form.email} onChange={handleChange} />
        <input name="password" className="w-full border p-2 rounded" placeholder="비밀번호" type="password" value={form.password} onChange={handleChange} />
        <button className="w-full bg-green-500 text-white p-2 rounded">회원가입</button>
      </form>
    </div>
  );
}
