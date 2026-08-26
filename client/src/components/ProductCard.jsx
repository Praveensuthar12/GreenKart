import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`,
          );
          scrollTo(0, 0);
        }}
        className="ios-card ios-press cursor-pointer border border-gray-100 hover:ios-shadow-md transition-all duration-300 flex flex-col"
      >
        <div className="group flex items-center justify-center p-4 pt-5 bg-gray-50/50 rounded-t-2xl">
          <img
            className="group-hover:scale-105 transition-transform duration-300 max-w-24 md:max-w-32"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="p-3.5 md:p-4 flex flex-col flex-1">
          <p className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit mb-1.5">
            {product.category}
          </p>
          <p className="text-gray-900 font-semibold text-sm md:text-base truncate w-full mb-1">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5 mb-2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="md:w-3 w-2.5"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}
            <span className="text-[11px] text-gray-400 ml-1">(4.0)</span>
          </div>
          <div className="flex items-end justify-between mt-auto pt-2">
            <div>
              <p className="text-base md:text-lg font-bold text-primary">
                {currency}{product.offerPrice}
              </p>
              <p className="text-[11px] text-gray-400 line-through">
                {currency}{product.price}
              </p>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {!cartItems[product._id] ? (
                <button
                  className="ios-press flex items-center justify-center gap-1 bg-primary/10 text-primary border border-primary/20 md:w-[72px] w-[60px] h-[32px] rounded-xl cursor-pointer text-xs font-semibold transition-all hover:bg-primary hover:text-white hover:border-primary"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart_icon" className="w-3.5 h-3.5" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-1 md:w-[76px] w-[64px] h-[32px] bg-primary rounded-xl select-none ios-shadow-sm">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="cursor-pointer text-white font-bold text-sm px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-white font-semibold text-sm">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="cursor-pointer text-white font-bold text-sm px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
