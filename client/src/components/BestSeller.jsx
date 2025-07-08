import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

function BestSeller() {
  const { products } = useAppContext();

  return (
    <div className="mt-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-primary to-indigo-600 text-transparent bg-clip-text">
  Products
</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
}

export default BestSeller;
