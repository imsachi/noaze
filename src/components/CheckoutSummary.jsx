export default function CheckoutSummary({ items = [] }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 100 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-gray-700"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.qty} × ${item.price}
              </p>
            </div>
            <p className="font-semibold">
              ${(item.price * item.qty).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t my-4"></div>

      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-600 mt-1">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
      </div>

      <div className="flex justify-between text-lg font-semibold mt-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
