import { useEffect, useState } from "react";
import api from "../api/axios";
import { User, AtSign, Phone, Package, Map } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center">Your Profile</h2>

        {/* User Info */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
          <p className="flex items-center gap-3 text-gray-700 text-lg">
            <User className="text-gray-500" />
            <strong>Name:</strong> {user.name}
          </p>

          <p className="flex items-center gap-3 text-gray-700 text-lg">
            <AtSign className="text-gray-500" />
            <strong>Email:</strong> {user.email}
          </p>

          <p className="flex items-center gap-3 text-gray-700 text-lg">
            <Phone className="text-gray-500" />
            <strong>Mobile:</strong> {user.mobile}
          </p>
        </div>

        {/* Orders Button */}
        <button
          onClick={() => (window.location.href = "/orders")}
          className="flex items-center justify-center gap-2 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          <Package className="text-white" />
          View Your Orders
        </button>

        {/* Address Section */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Map className="text-gray-600" />
            Saved Addresses
          </h3>

          {user.addresses?.length > 0 ? (
            <div className="space-y-4">
              {user.addresses.map((addr, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-white shadow-sm"
                >
                  <p className="font-semibold">{addr.fullName}</p>
                  <p>{addr.addressLine1}</p>
                  <p>{addr.addressLine2}</p>
                  <p>
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p>Mobile: {addr.mobile}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No saved addresses.</p>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={() =>
            api.post("/auth/logout").then(() => (window.location.href = "/"))
          }
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
