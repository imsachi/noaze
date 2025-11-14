import { useState } from "react";
import Header from "../components/Header";
import CheckoutSummary from "../components/CheckoutSummary";
import CheckoutAddressForm from "../components/CheckoutAddressForm";
import CheckoutPayment from "../components/CheckoutPayment";

export default function Checkout() {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
    state: "",
  });

  const items = [
    { id: 1, title: "Red Light Therapy Torch", qty: 1, price: 129.99 },
    { id: 2, title: "Protective Case", qty: 1, price: 19.99 },
  ];

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="md:col-span-2 space-y-8">
            <CheckoutAddressForm address={address} setAddress={setAddress} />
            <CheckoutPayment />
          </div>

          {/* Right column */}
          <CheckoutSummary items={items} />
        </div>
      </main>
    </>
  );
}
