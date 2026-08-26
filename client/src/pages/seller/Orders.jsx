import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[calc(100vh-57px)] overflow-y-scroll">
      <div className="p-6 md:p-10 max-w-5xl">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Orders</h2>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="ios-card ios-shadow-sm border border-gray-100 p-5"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <img
                      className="w-6 h-6 opacity-70"
                      src={assets.box_icon}
                      alt="boxIcon"
                    />
                  </div>
                  <div>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex flex-col">
                        <p className="font-semibold text-sm text-gray-900">
                          {item.product.name}{" "}
                          <span className="text-primary">x {item.quantity}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-500 md:text-right">
                  <p className="font-medium text-gray-900">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>
                    {order.address.street}, {order.address.city}
                  </p>
                  <p>
                    {order.address.state}, {order.address.zipcode}
                  </p>
                  <p>{order.address.phone}</p>
                </div>

                <div className="flex items-center gap-6 md:gap-8">
                  <p className="font-bold text-lg text-gray-900">
                    {currency}{order.amount}
                  </p>
                  <div className="text-sm space-y-0.5">
                    <p className="text-gray-500">{order.paymentType}</p>
                    <p className="text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      order.isPaid
                        ? "bg-primary/10 text-primary"
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[40vh]">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-400">No orders yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
