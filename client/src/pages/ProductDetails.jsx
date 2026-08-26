import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => product.category === item.category,
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  return (
    product && (
      <div className="mt-6 pb-20 sm:pb-0">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-primary transition-colors whitespace-nowrap">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors whitespace-nowrap">Products</Link>
          <span>/</span>
          <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors whitespace-nowrap">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-primary font-medium whitespace-nowrap">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="flex gap-3 md:gap-4">
            <div className="flex flex-col gap-2.5">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`border-2 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                    thumbnail === image ? "border-primary ios-shadow-sm" : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="border border-gray-100 rounded-2xl overflow-hidden ios-shadow-sm bg-gray-50/50 flex-1 max-w-sm md:max-w-md lg:max-w-lg">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-contain p-4"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="text-sm w-full md:w-1/2 flex flex-col">
            <span className="text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full w-fit mb-3">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-1 mt-2">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                    className="w-4 h-4"
                  />
                ))}
              <span className="text-sm text-gray-400 ml-1.5">(4.0)</span>
            </div>

            <div className="mt-5 p-4 bg-gray-50 rounded-2xl">
              <p className="text-gray-400 line-through text-sm">
                MRP: {currency}{product.price}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {currency}{product.offerPrice}
              </p>
              <span className="text-xs text-primary font-medium">
                {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
              </span>
              <p className="text-xs text-gray-400 mt-1">(inclusive of all taxes)</p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-900 mb-2">About Product</p>
              <ul className="space-y-1.5">
                {product.description.map((desc, index) => (
                  <li key={index} className="text-sm text-gray-500 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    {desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center mt-8 gap-3 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="ios-press flex-1 py-3.5 cursor-pointer font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all rounded-2xl"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="ios-press flex-1 py-3.5 cursor-pointer font-semibold bg-primary text-white hover:bg-primary-dull transition-all rounded-2xl ios-shadow-sm"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xl font-bold text-gray-900">Related Products</p>
            <button
              onClick={() => {
                navigate("/products");
                scrollTo(0, 0);
              }}
              className="text-sm text-primary font-medium hover:underline"
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 lg:grid-cols-5">
            {relatedProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
