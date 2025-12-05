import { useState, useEffect } from "react";
import { User, ShoppingCart } from "lucide-react"; // <-- Lucide Icons
import logo from "../assets/noaze.svg";

export default function Header({ onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);

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
      <div className="max-w-6xl mx-auto  flex items-center justify-between px-4">
        {/* LOGO */}
        <a href="/" className="flex items-center ml-2">
          <img src={logo} width={80} height={80}></img>
        </a>

        {/* NAVBAR */}
        <nav className="flex gap-6 items-center text-sm">
          <a href="#products" className="hover:underline hidden md:block">
            Products
          </a>

          {/* PROFILE ICON */}
          <a
            href="/profile"
            className="flex flex-col items-center text-white bg-violet-300 p-2 rounded-full  hover:text-black"
          >
            <User size={20} />
          </a>

          {/* CART ICON */}
          <button
            onClick={onOpenCart}
            className="flex flex-col items-center text-white bg-violet-300 p-2 rounded-full hover:text-black"
          >
            <ShoppingCart size={20} />
          </button>
        </nav>
      </div>
    </header>
  );
}
