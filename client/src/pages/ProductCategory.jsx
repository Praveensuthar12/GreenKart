import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category,
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category,
  );

  return (
    <div className="mt-8 pb-20 sm:pb-0">
      {searchCategory && (
        <div className="mb-6">
          <div
            className="rounded-2xl p-6 flex items-center gap-4"
            style={{ backgroundColor: searchCategory.bgColor }}
          >
            <div className="w-16 h-16 bg-white/60 rounded-xl flex items-center justify-center">
              <img src={searchCategory.image} alt="" className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {searchCategory.text}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">{filteredProducts.length} products</p>
            </div>
          </div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C7C7CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-400">No products found</p>
          <p className="text-sm text-gray-300 mt-1">Try checking back later</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
