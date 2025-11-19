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
          <div className="inline-flex items-center  bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-xs mb-4">
            Longevity Starts Today
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Future of Healthy Living Starts Here.
          </h1>
          <p className="mt-4 text-pink-100  max-w-xl">
            Innovative wellness solutions built for modern lifestyles—to help
            you feel better, look better, and live better.
          </p>
        </div>
        <div className="flex-1 flex justify-center md:justify-end"></div>
      </div>
    </section>
  );
}
