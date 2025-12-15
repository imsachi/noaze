import { useState, useEffect, useContext } from "react";
import { User, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // <-- import your cart context
import logo from "../assets/noaze.svg";

export default function Header({ onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  // Access cart items from context
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const cartCount = cartItems?.length || 0; // count items
  useEffect(() => {
    if (cartCount) {
      let count = 0;
      const totalItems = cartItems.map((item) => {
        count = count + item.qty;
      });
      setTotalItems(count);
    }
  }, [cartItems]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-40 transition-all ${
        scrolled ? "backdrop-blur-md bg-white/60 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        {/* LOGO */}
        <a href="/" className="flex items-center ml-2">
          <img src={logo} width={80} height={80} alt="logo" />
        </a>

        {/* NAVBAR */}
        <nav className="flex gap-6 items-center text-sm">
          <a
            href="/about"
            className="hover:underline hidden md:block font-bold"
          >
            About Noaze
          </a>

          {/* PROFILE ICON */}
          <a
            href="/profile"
            className="flex flex-col items-center text-white bg-gray-900 p-2 rounded-full hover:text-black"
          >
            <User size={20} />
          </a>

          {/* CART ICON + BADGE */}
          <button
            onClick={() => navigate("/checkout")}
            className="relative flex flex-col items-center text-white bg-violet-500 p-2 rounded-full hover:text-black"
          >
            <ShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
