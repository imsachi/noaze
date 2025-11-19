import { Tag } from "lucide-react";

export default function CouponBox({ coupon, setCoupon, setDiscount }) {
  const applyCoupon = () => {
    if (coupon === "NOAZE10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Tag className="w-5 h-5" />
        Discount Code
      </h2>

      <div className="flex gap-3">
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon"
          className="flex-grow p-3 border rounded-lg"
        />

        <button
          onClick={applyCoupon}
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
