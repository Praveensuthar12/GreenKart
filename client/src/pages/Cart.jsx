import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("PLease select an address");
      }

      // place order with cod
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        // place order with stripe
        const { data } = await axios.post("/api/order/stripe", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-6 gap-6 pb-24 sm:pb-0">
      <div className="flex-1 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-400 mt-1">{getCartCount()} items in your cart</p>
        </div>

        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-xs font-semibold uppercase tracking-wider pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="ios-card border border-gray-100 p-4 mb-3 flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr] items-center gap-4"
          >
            <div className="flex items-center gap-4 w-full">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`,
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                <div className="text-gray-400 text-sm mt-1 space-y-1">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <span>Qty:</span>
                    <select
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                      className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-primary"
                    >
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 9,
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center font-semibold text-gray-900">
              {currency}{product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="ios-press cursor-pointer w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors mx-auto"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-4 gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Continue Shopping
        </button>
      </div>

      {/* Order Summary */}
      <div className="w-full md:w-[380px] flex-shrink-0">
        <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-5 sticky top-24">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Delivery Address</p>
            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <p className="text-sm text-gray-600">
                  {selectedAddress
                    ? `${selectedAddress.firstName} ${selectedAddress.lastName}, ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zipcode}`
                    : "No address found"}
                </p>
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-primary text-xs font-semibold mt-1 cursor-pointer"
                >
                  Change
                </button>
              </div>
              {showAddress && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 text-sm rounded-xl ios-shadow-lg z-10 overflow-hidden">
                  {addresses.map((address, index) => (
                    <p
                      key={index}
                      onClick={() => {
                        setSelectedAddress(address);
                        setShowAddress(false);
                      }}
                      className="text-gray-600 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    >
                      {address.firstName} {address.lastName}, {address.street}, {address.city}
                    </p>
                  ))}
                  <p
                    onClick={() => navigate("/add-address")}
                    className="text-primary text-center cursor-pointer p-3 hover:bg-primary/5 font-semibold"
                  >
                    + Add new address
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Payment Method</p>
            <div className="flex gap-2">
              {["COD", "Online"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPaymentOption(opt)}
                  className={`ios-press flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                    paymentOption === opt
                      ? "bg-primary text-white border-primary ios-shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {opt === "COD" ? "Cash on Delivery" : "Online"}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <p className="flex justify-between text-sm text-gray-500">
              <span>Price</span>
              <span>{currency}{getCartAmount()}</span>
            </p>
            <p className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping Fee</span>
              <span className="text-primary font-medium">Free</span>
            </p>
            <p className="flex justify-between text-sm text-gray-500">
              <span>Tax (2%)</span>
              <span>{currency}{(getCartAmount() * 2) / 100}</span>
            </p>
            <div className="border-t border-gray-200 pt-3">
              <p className="flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>{currency}{getCartAmount() + (getCartAmount() * 2) / 100}</span>
              </p>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="ios-press w-full py-3.5 mt-5 cursor-pointer bg-primary text-white font-semibold rounded-2xl hover:bg-primary-dull transition-all ios-shadow-sm"
          >
            {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
