import React from "react";
import { assets, categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

function Categories() {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-primary to-indigo-600 text-transparent bg-clip-text">
  Browse Categories
</h2>


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6">
        {categories.map((category, index) => (
          <div 
            className="group p-4 sm:p-5 rounded-xl flex flex-col items-center justify-center cursor-pointer
              bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            key={index}
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
          >
            <div className="relative overflow-hidden rounded-full p-2">
              <img
                src={category.image}
                alt={category.text}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain group-hover:scale-110 
                  transition-transform duration-300"
              />
            </div>
            <p className="mt-3 text-sm sm:text-base font-semibold text-gray-700 text-center 
              group-hover:text-gray-900 transition-colors">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;