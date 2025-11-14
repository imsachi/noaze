import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const user = {
    name: "Savyasachi",
    email: "savyasachi@example.com",
    phone: "+91 98765 43210",
  };

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/");
  };

  return (
    <div>
      <Header />
      <main className="pt-28 pb-20 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          My Profile
        </h1>

        <ProfileCard user={user} onLogout={handleLogout} />
      </main>
    </div>
  );
}
