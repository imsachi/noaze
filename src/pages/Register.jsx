import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function Register({ onClose }) {
  const [displayForm, setDisplayForm] = useState("register");
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);
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
      const res = await api.post("/auth/register", form);

      setMsg("Registration successful!");

      setUser(res.data.user);
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

  if (displayForm === "register") {
    return (
      <div className="min-h-screen flex items-center justify-center from-gray-50 to-gray-100 px-4">
        {!success && (
          <form
            onSubmit={submit}
            className="
            bg-white/80 backdrop-blur-lg 
             p-4 px-12
             rounded-2xl 
           w-full max-w-md space-y-6
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
              <button
                onClick={() => setDisplayForm("login")}
                className="text-black underline"
              >
                Login
              </button>
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
  } else if (displayForm === "login") {
    return <LoginForm onClose={onClose} />;
  }
}
const LoginForm = ({ onClose }) => {
  const [msg, setMsg] = useState("");
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    emailOrMobile: "",
    password: "",
  });
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      const profile = await api.get("/auth/me");
      setUser(profile.data.user);
      onClose();
    } catch (err) {
      setMsg(err.response?.data?.error || "Something went wrong.!"); //hghhh
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
};
