export default function Hero() {
  return (
    <section className="pt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          {/* Background video */}
          <video
            autoPlay
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          >
            <source src="/videos/header-bg.mp4" type="video/mp4" />
          </video>
          <div className="inline-flex items-center gap-3 bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-xs mb-4">
            New • Blue Light Solutions
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Protect your eyes, sharpen your focus
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl">
            High-performance blue-light blockers and workplace filters designed
            for long hours at screens. Clinically-minded design, everyday
            comfort.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#products"
              className="px-5 py-3 rounded-lg bg-sky-600 text-white font-medium shadow-lg"
            >
              Shop Products
            </a>
            <a href="#why" className="px-5 py-3 rounded-lg border">
              Learn Why
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end"></div>
      </div>
    </section>
  );
}
