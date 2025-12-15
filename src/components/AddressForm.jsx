import { useState, useEffect } from "react";
import api from "../api/axios";

export default function AddressComponent({ onAddressSaved }) {
  const [user, setUser] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);
  const [pinError, setPinError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
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
      setForm((prev) => ({
        ...prev,
        fullName: profile.data.user?.name || "",
        mobile: profile.data.user?.mobile || "",
        email: profile.data.user?.email || "",
      }));
    } catch (err) {
      console.error("Profile fetch failed");
    }
  };

  // -----------------------------
  // 📍 Check pincode automatically
  // -----------------------------
  const checkPincode = async (pin) => {
    if (pin.length !== 6) return;

    setPinLoading(true);
    setPinError("");

    try {
      const res = await api.get("/store/check-pincode", {
        params: { pin },
      });

      const postal = res.data?.delivery_codes?.[0]?.postal_code;

      if (!postal) {
        setPinError("Pincode not serviceable");
        return;
      }

      setForm((prev) => ({
        ...prev,
        city: postal.district || "",
        state: postal.state_code || postal.district || "",
      }));
    } catch (err) {
      setPinError("Pincode not serviceable");
    } finally {
      setPinLoading(false);
    }
  };

  const saveAddress = async () => {
    const requiredFields = [
      "fullName",
      "mobile",
      "email",
      "pincode",
      "state",
      "city",
      "addressLine1",
    ];

    const emptyField = requiredFields.find((field) => !form[field]?.trim());

    if (emptyField) {
      alert(`Please fill the ${emptyField} field.`);
      return;
    }

    setLoading(true);
    try {
      console.log("fuck1");
      const res = await api.post("/users/address", form, {
        withCredentials: true,
      });
      console.log(res.data);
      setUser({ ...user, addresses: res.data.addresses });
      onAddressSaved();
      setFormVisible(false);
    } catch {
      alert("Failed to save address");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl space-y-4">
      <h3 className="text-xl font-semibold">Add Delivery Address</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Full Name"
          className="border p-3 rounded-lg"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          placeholder="Mobile Number"
          className="border p-3 rounded-lg"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />

        <input
          placeholder="Email"
          className="border p-3 rounded-lg"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* 📍 PINCODE */}
        <div>
          <input
            placeholder="Pincode"
            maxLength={6}
            className="border p-3 rounded-lg w-full"
            value={form.pincode}
            onChange={(e) => {
              const pin = e.target.value.replace(/\D/g, "");
              setForm({ ...form, pincode: pin });
              checkPincode(pin);
            }}
          />
          {pinLoading && (
            <p className="text-sm text-gray-500 mt-1">
              Checking serviceability…
            </p>
          )}
          {pinError && <p className="text-sm text-red-500 mt-1">{pinError}</p>}
        </div>

        <input
          placeholder="State"
          className="border p-3 rounded-lg"
          value={form.state}
          readOnly
        />

        <input
          placeholder="City"
          className="border p-3 rounded-lg"
          value={form.city}
          readOnly
        />

        <input
          placeholder="Address Line 1"
          className="border p-3 rounded-lg col-span-2"
          value={form.addressLine1}
          onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
        />

        <input
          placeholder="Address Line 2"
          className="border p-3 rounded-lg col-span-2"
          value={form.addressLine2}
          onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
        />

        <input
          placeholder="Landmark (Optional)"
          className="border p-3 rounded-lg col-span-2"
          value={form.landmark}
          onChange={(e) => setForm({ ...form, landmark: e.target.value })}
        />
      </div>

      <button
        onClick={saveAddress}
        disabled={loading || pinError}
        className="mt-4 w-full bg-black text-white py-3 rounded-xl text-lg disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save & Continue"}
      </button>
    </div>
  );
}
