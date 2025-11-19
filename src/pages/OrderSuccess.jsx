import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import successAnim from "../assets/success_animation.json"; // add your animation JSON here

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="w-72">
        <Lottie animationData={successAnim} loop={false} />
      </div>

      <h1 className="text-2xl font-bold mt-4">Order Placed Successfully!</h1>
      <p className="text-gray-500 mt-2 text-center">
        Thank you for your purchase. Your order is being processed.
      </p>

      <Link
        to="/"
        className="mt-6 bg-black text-white px-6 py-3 rounded-xl text-lg"
      >
        Go to Home
      </Link>
    </div>
  );
}
