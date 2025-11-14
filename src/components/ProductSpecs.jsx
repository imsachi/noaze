export default function ProductSpecs({ specs = {}, description }) {
  return (
    <section className="mt-20 border-t pt-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Product Details
        </h2>

        {/* Specifications Table */}
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 text-sm text-gray-700">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b py-2">
              <span className="font-medium text-gray-600 capitalize">
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-gray-800">{value}</span>
            </div>
          ))}
        </div>

        {/* Long Description */}
        <div className="mt-10">
          <h3 className="text-xl font-medium text-gray-900 mb-3">
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
