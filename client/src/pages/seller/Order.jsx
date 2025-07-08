import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Order = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/all", {
        withCredentials: true,
      });
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-auto bg-gray-50">
      <div className="p-4 sm:p-6 md:p-10 max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Orders List
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="flex hover:border-primary hover:border-2 flex-col md:grid md:grid-cols-4 md:items-center gap-6 p-6 max-w-4xl rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Order Items */}
              <div className="flex gap-4 items-center">
                <img
                  className="w-14 h-14 object-cover rounded-md"
                  src={assets.box_icon}
                  alt="boxIcon"
                />
                <div className="flex flex-col space-y-1 max-w-80">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-800 truncate">
                        {item.product?.name || "Unknown Product"}
                      </p>
                      <span className="text-primary font-medium whitespace-nowrap">
                        x {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-gray-800">
                  {order.address?.firstName || ""} {order.address?.lastName || ""}
                </p>
                <p className="mt-1">
                  {[order.address?.street, order.address?.city, order.address?.state, order.address?.zipcode, order.address?.country]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                <p className="mt-1 font-medium">{order.address?.phone || "N/A"}</p>
              </div>

              {/* Amount */}
              <p className="font-semibold text-lg text-gray-900 my-auto">
                {currency}
                {order.amount?.toFixed(2)}
              </p>

              {/* Payment Details */}
              <div className="flex flex-col text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-semibold">Method:</span>{" "}
                  {order.paymentType}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Payment:</span>{" "}
                  <span
                    className={`${
                      order.isPaid ? "text-green-600" : "text-red-600"
                    } font-medium`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
