export default function AboutNoaze() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">About Noaze</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Noaze is a wellness and longevity focused platform built with one
          clear purpose: to help people live healthier, happier, and longer
          lives. We believe true wellness is not a trend, it is a lifestyle
          shaped by daily choices, science-backed habits, and mindful living.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to make wellness simple, accessible, and effective.
              Through thoughtfully designed products, nourishing food, fitness
              support, and lifestyle protocols, Noaze empowers individuals to
              take control of their long-term health and vitality.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              We envision a world where longevity is proactive, not reactive. A
              world where people do not just add years to life, but add life to
              their years.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-10">What We Do</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-2xl shadow-sm border">
            <h3 className="font-semibold mb-2">Longevity Products</h3>
            <p className="text-gray-600 text-sm">
              Wellness tools and solutions designed to support long-term health,
              recovery, and vitality.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow-sm border">
            <h3 className="font-semibold mb-2">Nutrition & Food</h3>
            <p className="text-gray-600 text-sm">
              Clean, functional food products crafted to nourish the body and
              support metabolic health.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow-sm border">
            <h3 className="font-semibold mb-2">Fitness & Performance</h3>
            <p className="text-gray-600 text-sm">
              Tools and guidance that enhance strength, mobility, and everyday
              performance.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow-sm border">
            <h3 className="font-semibold mb-2">Lifestyle Protocols</h3>
            <p className="text-gray-600 text-sm">
              Structured plans and routines that align sleep, movement,
              nutrition, and recovery.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold mb-6">Our Philosophy</h2>
          <p className="text-gray-600 max-w-4xl">
            At Noaze, wellness is built at the intersection of science and
            simplicity. We focus on sustainable habits, evidence-based
            solutions, and practical routines that fit real lives. Every product
            and protocol we offer is aligned with our ultimate goal: helping
            people feel better today while investing in their future health.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-4">
          We are always happy to connect, collaborate, and support your wellness
          journey.
        </p>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">Email:</span> support@noaze.com
          </p>
          <p>
            <span className="font-medium">Phone:</span> 8985272927
          </p>
        </div>
      </section>
    </div>
  );
}
