import { CreditCard, Wallet, IndianRupee } from "lucide-react";
import { useState } from "react";

export default function PaymentMethods() {
  const [method, setMethod] = useState("card");

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Payment Method
      </h2>

      <div className="space-y-4">
        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          <CreditCard />
          Debit / Credit Card
        </label>

        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="upi"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
          />
          <Wallet />
          UPI (Google Pay / PhonePe / Paytm)
        </label>

        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          <IndianRupee />
          Cash on Delivery
        </label>
      </div>
    </div>
  );
}
