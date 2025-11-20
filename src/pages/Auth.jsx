import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailOrMobile: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      const profile = await api.get("/auth/me");
      setUser(profile.data.user);
      navigate(-2);
    } catch (err) {
      setMsg(err.response?.data?.error || "Error"); //hghhh
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={submit}
        className="bg-white shadow-lg rounded-xl p-8 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {msg && <p className="text-center text-red-600">{msg}</p>}

        <input
          type="text"
          placeholder="Email or Mobile"
          className="w-full border rounded-lg p-3"
          onChange={(e) => setForm({ ...form, emailOrMobile: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800">
          Login
        </button>
      </form>
    </div>
  );
}
