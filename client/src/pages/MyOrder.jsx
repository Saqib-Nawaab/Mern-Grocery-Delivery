import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function MyOrder() {
  const [myorders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      // const { data } = await axios.post("/api/order/user");
      const { data } = await axios.get(`/api/order/user/${user._id}`);
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">
          My Orders
        </h1>
        <div className="mt-2 w-24 h-1 bg-primary rounded-full mx-auto" />
      </div>

      {myorders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders yet.</p>
      ) : (
        myorders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl mb-8 p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-4xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-500 font-medium mb-6">
              <span className="mb-2 sm:mb-0">Order ID: {order._id}</span>
              <span className="mb-2 sm:mb-0">Payment: {order.paymentType}</span>
              <span className="text-primary font-semibold">
                Total: {currency}
                {(order.amount || 0).toFixed(2)}
              </span>
            </div>

            {order.items.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-lg mb-4 last:mb-0 transition-all duration-200 hover:bg-gray-100 ${
                  order.items.length !== i + 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <img
                      src={item.product?.images?.[0] || ""}
                      alt={item.product?.name || "Product"}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.product?.name || "Unnamed Product"}
                    </h2>
                    <p className="text-gray-600">
                      {item.product?.category || "Category"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:ml-8 mb-4 md:mb-0 text-gray-600">
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Status:
                    <span
                      className={`ml-1 font-medium ${
                        order.status === "delivered"
                          ? "text-green-600"
                          : order.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <p className="text-primary text-lg font-semibold">
                  Amount: {currency}
                  {(item.product?.offerPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrder;
