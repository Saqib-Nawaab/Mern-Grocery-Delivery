import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

function ProductCatogeries() {
  const { products } = useAppContext();
  const { category } = useParams();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  );

  const filterProduct = products.filter(
    (product) =>
      product.category &&
      product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="mt-16 min-h-screen px-4 sm:px-6 lg:px-8">
      {searchCategory && (
        <div className="text-center mb-12">
          <h1
            className={`text-4xl sm:text-5xl font-extrabold transition-all duration-1000 ease-out bg-gradient-to-r from-purple-800 to-indigo-300 bg-clip-text text-transparent ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {searchCategory.text.toUpperCase()}
          </h1>
          <div
            className={`mx-auto mt-4 w-35 h-1 rounded-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-1000 ease-out delay-300 ${
              isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
          ></div>
        </div>
      )}

      <div>
        {filterProduct.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
            {filterProduct.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-2xl font-medium text-primary">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCatogeries;
