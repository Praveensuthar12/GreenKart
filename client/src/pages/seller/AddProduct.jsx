import React, { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const { axios } = useAppContext();

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post("/api/product/add", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[calc(100vh-57px)] overflow-y-scroll">
      <div className="p-6 md:p-10 max-w-2xl">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Product</h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* Image Upload */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Product Images</label>
            <div className="grid grid-cols-4 gap-3">
              {Array(4)
                .fill("")
                .map((_, index) => (
                  <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                    <input
                      onChange={(e) => {
                        const updatedFiles = [...files];
                        updatedFiles[index] = e.target.files[0];
                        setFiles(updatedFiles);
                      }}
                      type="file"
                      id={`image${index}`}
                      hidden
                    />
                    <div className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          files[index]
                            ? URL.createObjectURL(files[index])
                            : assets.upload_area
                        }
                        alt="uploadArea"
                      />
                    </div>
                  </label>
                ))}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5" htmlFor="product-name">
              Product Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="product-name"
              type="text"
              placeholder="e.g. Organic Avocado"
              className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5" htmlFor="product-description">
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="product-description"
              rows={4}
              className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm resize-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              placeholder="One line per feature..."
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5" htmlFor="category">
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              id="category"
              className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            >
              <option value="">Select Category</option>
              {categories.map((item, index) => (
                <option key={index} value={item.path}>
                  {item.path}
                </option>
              ))}
            </select>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5" htmlFor="product-price">
                Price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                id="product-price"
                type="number"
                placeholder="0.00"
                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5" htmlFor="offer-price">
                Offer Price
              </label>
              <input
                onChange={(e) => setOfferPrice(e.target.value)}
                value={offerPrice}
                id="offer-price"
                type="number"
                placeholder="0.00"
                className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                required
              />
            </div>
          </div>

          <button className="ios-press px-8 py-3 bg-primary text-white font-semibold rounded-2xl ios-shadow-sm hover:bg-primary-dull transition-all text-sm">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
