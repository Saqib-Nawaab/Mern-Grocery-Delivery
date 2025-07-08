import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
const AllProducts = () => {
  const { products, setSearchQuery, searchQuery } = useAppContext();

  const [filterProducts, setFilterProducts] = useState([]);
   const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    setIsVisible(true);
    if (searchQuery.length > 0) {
      setFilterProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilterProducts(products);
    }
  }, [searchQuery, products]);

  return (
    <div className="mt-16 flex flex-col ">
      <div className="text-center mb-12">
        <h1
          className={`text-4xl sm:text-5xl font-extrabold text-purple-700 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          All <span className="text-primary">Products</span>
        </h1>
        <div
          className={`mx-auto mt-4 w-24 h-1 rounded-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        ></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">

    {
      filterProducts.filter((product) => product.inStock ).map((product, index) => (
        <ProductCard key={index} product={product} />
      ))
    }

      </div>
    </div>
  );
};

export default AllProducts;
