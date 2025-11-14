import { useState } from "react";

export default function ProductGallery({ images = [] }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-sm border">
        <img
          src={images[selected]}
          alt="Product view"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 justify-center">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
              i === selected ? "border-sky-500" : "border-transparent"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
