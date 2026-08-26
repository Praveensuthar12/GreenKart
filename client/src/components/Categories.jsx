import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl md:text-2xl font-bold text-gray-900">Categories</p>
        <button
          onClick={() => navigate("/products")}
          className="text-sm text-primary font-medium hover:underline"
        >
          See all
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="ios-press group cursor-pointer py-5 px-3 gap-2 rounded-2xl flex flex-col justify-center items-center transition-all duration-200 hover:ios-shadow-md border border-gray-100/50"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <img
                src={category.image}
                alt={category.text}
                className="group-hover:scale-110 transition-transform duration-300 max-w-full max-h-full"
              />
            </div>
            <p className="text-xs md:text-sm font-medium text-gray-700 text-center mt-1">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
