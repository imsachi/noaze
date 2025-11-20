import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const previousPage = location.state?.from || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      setMsg("Registration successful!");
      setSuccess(true);

      // Redirect to previous page after 1.5 sec
      setTimeout(() => {
        navigate(previousPage);
      }, 1500);
    } catch (err) {
      setMsg(err.response?.data?.error || "Error");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-gray-50 to-gray-100 px-4">
      {!success && (
        <form
          onSubmit={submit}
          className="
            bg-white/80 backdrop-blur-lg 
            border border-gray-200 
            shadow-xl rounded-2xl 
            p-8 w-full max-w-md space-y-6
            transition
          "
        >
          <h2 className="text-3xl font-semibold text-gray-900 text-center tracking-tight">
            Create an Account
          </h2>

          {msg && (
            <p
              className={`text-center text-sm py-2 rounded-lg ${
                success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {msg}
            </p>
          )}

          {[
            { label: "Name", type: "text", key: "name" },
            { label: "Email", type: "email", key: "email" },
            { label: "Mobile", type: "text", key: "mobile" },
            { label: "Password", type: "password", key: "password" },
          ].map((field) => (
            <div key={field.key} className="relative">
              <input
                type={field.type}
                onChange={(e) =>
                  setForm({ ...form, [field.key]: e.target.value })
                }
                required
                className="
                  peer w-full px-4 py-3 
                  border border-gray-300 
                  rounded-xl bg-gray-50/60 
                  focus:bg-white
                  focus:border-black 
                  focus:ring-2 focus:ring-black/20
                  outline-none
                  transition-all
                "
              />
              <label
                className="
                  absolute left-4 top-3 
                  text-gray-500 pointer-events-none
                  transition-all duration-200 
                  peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-black
                  peer-valid:-translate-y-5 peer-valid:text-xs
                "
              >
                {field.label}
              </label>
            </div>
          ))}

          <button
            className="
              w-full bg-black text-white py-3 rounded-xl 
              text-lg font-medium
              hover:bg-gray-800
              active:scale-[0.98]
              transition-all shadow-md
            "
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" replace className="text-black underline">
              Login
            </Link>
          </p>
        </form>
      )}

      {/* Success popup */}
      {success && (
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center space-y-3 border border-gray-200">
          <h2 className="text-2xl font-semibold text-green-600">
            🎉 Registration Successful!
          </h2>
          <p className="text-gray-600 text-sm">Redirecting you back...</p>
        </div>
      )}
    </div>
  );
}
