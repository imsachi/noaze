import { useState } from "react";

export default function ProductGallery({ media = [] }) {
  const [selected, setSelected] = useState(0);

  const isVideo = (url) =>
    url.endsWith(".mp4") ||
    url.endsWith(".mov") ||
    url.endsWith(".webm") ||
    url.endsWith(".mkv");

  return (
    <div className="flex flex-col gap-4">
      {/* Main Display */}
      <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-sm border bg-black">
        {isVideo(media[selected].url) ? (
          <video
            src={media[selected].url}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={media[selected].url}
            alt="Product view"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 justify-center">
        {media.map((item, i) => {
          const video = isVideo(item.url);

          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                i === selected ? "border-sky-500" : "border-transparent"
              }`}
            >
              {video ? (
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                />
              ) : (
                <img
                  src={item.url}
                  className="w-full h-full object-cover"
                  alt=""
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
