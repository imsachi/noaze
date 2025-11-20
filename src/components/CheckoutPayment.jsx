import { CreditCard, Wallet } from "lucide-react";

export default function CheckoutPayment() {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="payment" disabled />
          <CreditCard size={18} className="text-sky-600" />
          <span>Credit / Debit Card</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="payment" disabled />
          <Wallet size={18} className="text-sky-600" />
          <span>UPI / Wallets</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="payment" />
          <span>Cash on Delivery</span>
        </label>
      </div>

      <button className="mt-6 w-full bg-sky-600 text-white py-3 rounded-xl font-medium hover:bg-sky-700 transition">
        Place Order
      </button>
    </div>
  );
}
