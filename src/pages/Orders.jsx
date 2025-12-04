import { useEffect, useState } from "react";
import api from "../api/axios"; // your axios instance

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders"); // modify to your route
        console.log(res.data.orders);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const cancelOrder = async (id) => {
    if (!window.confirm("Do you want to cancel this order?")) return;
    try {
      await api.post(`/orders/${id}/cancel`);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, orderStatus: "Cancelled" } : o))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    }
  };

  const returnOrder = async (id) => {
    if (!window.confirm("Request return for this order?")) return;
    try {
      await api.post(`/orders/${id}/return`);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, orderStatus: "Return Requested" } : o
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to request return");
    }
  };

  if (loading) return <p className="text-center">Loading orders...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-5">My Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg p-4 mb-5 shadow-sm">
          {/* Order Header */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
            <span
              className={`px-3 py-1 rounded font-bold  text-sm ${
                order.orderStatus === "Cancelled"
                  ? "text-red-500"
                  : order.orderStatus === "Return Requested"
                  ? "text-yellow-600"
                  : "text-blue-600"
              }`}
            >
              {order.orderStatus}
            </span>
          </div>

          {/* Items */}
          {order.items.map((item, i) => (
            <div key={i} className="mb-3 border-b pb-2">
              <p className="font-medium">Product ID: {item.product}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          ))}

          {/* Address */}

          <div className="mb-3">
            <h4 className="font-semibold mb-1">Delivery Address</h4>
            <p>{order.deliveryAddress?.fullName}</p>
            <p>{order.deliveryAddress?.mobile}</p>
            <p>
              {order.deliveryAddress?.addressLine1},{" "}
              {order.deliveryAddress?.addressLine2}
            </p>
            <p>
              {order.deliveryAddress?.city} - {order.deliveryAddress?.pincode}
            </p>
            <p>{order.deliveryAddress?.state}</p>
          </div>

          {/* Price Summary */}
          <div className="mb-3 font-semibold">
            Total Paid: ₹{order.billSummary.totalPayable}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {order.orderStatus !== "Cancelled" &&
              order.orderStatus !== "Return Requested" && (
                <>
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel Order
                  </button>

                  <button
                    onClick={() => returnOrder(order._id)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Return Order
                  </button>
                </>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}
