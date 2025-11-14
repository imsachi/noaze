export default function CheckoutAddressForm({ address, setAddress }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={address.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          type="text"
          name="phone"
          value={address.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <input
        type="text"
        name="street"
        value={address.street}
        onChange={handleChange}
        placeholder="Street Address"
        className="border rounded-lg p-3 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          placeholder="City"
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          type="text"
          name="pincode"
          value={address.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <input
        type="text"
        name="state"
        value={address.state}
        onChange={handleChange}
        placeholder="State"
        className="border rounded-lg p-3 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );
}
