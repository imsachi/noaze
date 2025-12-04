import { useState, useEffect, useContext } from "react";
import api from "../api/axios";

export default function AddressComponent({ onAddressSaved }) {
  const [user, setUser] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.name || "",
    mobile: user?.mobile || "",
    email: user?.email || "",
    pincode: "",
    state: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
  });
  useEffect(() => {
    getAddress();
  }, []);
  const getAddress = async () => {
    try {
      const profile = await api.get("/auth/me");
      setForm({
        fullName: profile.data.user?.name || "",
        mobile: profile.data.user?.mobile || "",
        email: profile.data.user?.email || "",
        pincode: "",
        state: "",
        city: "",
        addressLine1: "",
        addressLine2: "",
        landmark: "",
      });
    } catch (err) {
      setMsg(err.response?.data?.error || "Error"); //hghhh
    }
  };

  const saveAddress = async () => {
    // required fields except optional ones
    const requiredFields = [
      "fullName",
      "mobile",
      "email",
      "pincode",
      "state",
      "city",
      "addressLine1",
    ];

    // Check if any required field is empty
    const emptyField = requiredFields.find((field) => !form[field]?.trim());

    if (emptyField) {
      alert(`Please fill the ${emptyField} field.`);
      return; // stop execution
    }

    setLoading(true);
    try {
      const res = await api.post("/users/address", form, {
        withCredentials: true,
      });

      setUser({ ...user, addresses: res.data.addresses });
      onAddressSaved();
      setFormVisible(false);
    } catch (err) {
      alert("Failed to save address");
    }
    setLoading(false);
  };

  if (!formVisible && user?.addresses?.length > 0) {
    const addr = user.addresses[user.addresses.length - 1];

    return (
      <div className="border rounded-xl p-4 bg-white ">
        <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>

        <p className="text-gray-700">{addr.fullName}</p>
        <p className="text-gray-700">{addr.addressLine1}</p>
        <p className="text-gray-700">{addr.addressLine2}</p>
        <p className="text-gray-700">
          {addr.city}, {addr.state} - {addr.pincode}
        </p>
        <p className="text-gray-700">Mobile: {addr.mobile}</p>

        <button
          onClick={() => setFormVisible(true)}
          className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
        >
          Edit Address
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl  space-y-4">
      <h3 className="text-xl font-semibold">Add Delivery Address</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "fullName", label: "Full Name" },
          { key: "mobile", label: "Mobile Number" },
          { key: "email", label: "Email" },
          { key: "pincode", label: "Pincode" },
          { key: "state", label: "State" },
          { key: "city", label: "City" },
          { key: "addressLine1", label: "Address Line 1" },
          { key: "addressLine2", label: "Address Line 2" },
          { key: "landmark", label: "Landmark (Optional)" },
        ].map((f) => (
          <input
            key={f.key}
            placeholder={f.label}
            className="border p-3 rounded-lg w-full"
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            value={form[f.key]}
          />
        ))}
      </div>

      <button
        onClick={saveAddress}
        className="mt-4 w-full bg-black text-white py-3 rounded-xl text-lg"
      >
        {loading ? "Saving..." : "Save & Continue"}
      </button>
    </div>
  );
}
