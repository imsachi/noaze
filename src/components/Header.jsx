import { useState, useEffect } from "react";

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
      <div className="max-w-6xl mx-auto  py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">
            L
          </div>
          <span className="font-semibold">Life in beta</span>
        </a>
        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a href="#products" className="hover:underline">
            Products
          </a>
          <a href="#features" className="hover:underline">
            Why it works
          </a>
          <a href="#reviews" className="hover:underline">
            Reviews
          </a>
          <a href="/profile" className="hover:underline">
            Profile
          </a>
          <button onClick={onOpenCart} className="px-3 py-2 rounded-md border">
            Cart
          </button>
        </nav>
      </div>
    </header>
  );
}
