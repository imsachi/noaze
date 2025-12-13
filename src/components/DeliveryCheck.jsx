import { useState } from "react";
import api from "../api/axios";

export default function DeliveryCheck({}) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [tat, setTat] = useState(null);
  const [error, setError] = useState("");

  const checkDelivery = async () => {
    if (pin.length !== 6) {
      setError("Enter a valid 6-digit pincode");
      return;
    }

    setLoading(true);
    setError("");
    setTat(null);

    try {
      const res = await api.get("/store/check-delivery", {
        params: { destination_pin: pin },
      });

      if (res.data.success) {
        setTat(res.data.data.tat);
      } else {
        setError(res.data.msg || "Not serviceable");
      }
    } catch (err) {
      setError("Unable to check delivery right now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border rounded-xl p-4 space-y-3 shadow-sm">
      <p className="text-sm font-medium text-gray-700">
        Check delivery availability
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter pincode"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none"
        />

        <button
          onClick={checkDelivery}
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {/* Result */}
      {tat !== null && (
        <p className="text-green-600 text-sm font-medium">
          🚚 Delivery in <span className="font-semibold">{tat} days</span>
        </p>
      )}

      {error && <p className="text-red-500 text-sm font-medium">❌ {error}</p>}
    </div>
  );
}
