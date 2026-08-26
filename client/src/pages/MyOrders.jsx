import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const MyOrders = () => {
  const [myOrders, SetMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");

      if (data.success) {
        SetMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-8 pb-16">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-tight">My Orders</h1>
        <p className="text-sm text-gray-400 mt-1">{myOrders.length} order{myOrders.length !== 1 ? 's' : ''} found</p>
      </div>

      {myOrders.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[40vh]">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-400">No orders yet</p>
          <p className="text-sm text-gray-300 mt-1">Start shopping to see your orders here</p>
        </div>
      )}

      <div className="space-y-4">
        {myOrders.map((order, index) => (
          <div
            key={index}
            className="ios-card border border-gray-100 overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-gray-50/80 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="font-mono bg-white px-2.5 py-1 rounded-lg border border-gray-100">
                  #{order._id.slice(-8).toUpperCase()}
                </span>
                <span>{order.paymentType}</span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {currency}{order.amount}
              </span>
            </div>

            {/* Order Items */}
            {order.items.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row md:items-center justify-between p-5 gap-4 ${
                  order.items.length !== index + 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/5 rounded-xl overflow-hidden flex-shrink-0 border border-primary/10">
                    <img
                      src={item.product.image[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-gray-400">{item.product.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:gap-8">
                  <div className="text-sm text-gray-500 space-y-0.5">
                    <p>Qty: {item.quantity || "1"}</p>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-primary/10 text-primary"
                        : order.status === "Cancelled"
                          ? "bg-red-50 text-red-500"
                          : "bg-amber-50 text-amber-600"
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-primary font-bold text-sm mt-1">
                      {currency}{item.product.offerPrice * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
