import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setTitle(res.data.post.title);
      setContent(res.data.post.content);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`/posts/${id}`, { title, content });
    navigate(`/posts/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">게시글 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="w-full border p-2 rounded h-60" value={content} onChange={(e) => setContent(e.target.value)} />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">수정 완료</button>
      </form>
    </div>
  );
}
