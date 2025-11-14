import { User, Phone, Package, LogOut, Mail } from "lucide-react";

export default function ProfileCard({ user, onLogout }) {
  return (
    <div className="bg-white shadow-sm border rounded-2xl p-8 max-w-md mx-auto text-center">
      {/* Profile Avatar */}
      <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold">
        {user.name.charAt(0).toUpperCase()}
      </div>

      {/* Basic Info */}
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">{user.name}</h2>
      <p className="text-gray-500 flex items-center justify-center gap-2 mt-1">
        <Mail size={16} /> {user.email}
      </p>
      <p className="text-gray-500 flex items-center justify-center gap-2 mt-1">
        <Phone size={16} /> {user.phone}
      </p>

      {/* Divider */}
      <div className="my-6 border-t" />

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border hover:bg-gray-50 transition">
          <Package size={18} />
          View Orders
        </button>

        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border hover:bg-gray-50 transition">
          <User size={18} />
          Edit Profile
        </button>

        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
