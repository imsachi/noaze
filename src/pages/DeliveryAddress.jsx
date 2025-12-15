export default function DeliveryAddress({ address, onEdit }) {
  if (!address) return null;

  return (
    <div className="border rounded-2xl p-6 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Delivery Address</h2>
        <button
          onClick={onEdit}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Edit
        </button>
      </div>

      {/* Address Content */}
      <div className="space-y-1 text-gray-700">
        <p className="font-medium text-gray-900">{address.fullName}</p>
        <p>{address.addressLine1}</p>
        <p>{address.addressLine2}</p>
        {address.landmark && <p>Landmark: {address.landmark}</p>}
        <p>
          {address.city}, {address.state} - {address.pincode}
        </p>
        <p>Mobile: {address.mobile}</p>
        <p>Email: {address.email}</p>
      </div>

      {/* Default Badge */}
      {address.isDefault && (
        <div className="mt-4 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          Default Address
        </div>
      )}
    </div>
  );
}
