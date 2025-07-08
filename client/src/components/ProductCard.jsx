import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, navigate, addToCart, removeFromCart, cartItems } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="group border border-gray-200 rounded-xl bg-white w-full max-w-[16rem] sm:max-w-[18rem] mx-auto my-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <div className="w-full h-40 sm:h-48 flex items-center justify-center p-4 sm:p-5 bg-gray-50">
          <img
            className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
            src={product.images[0] || assets.upload_area}
            alt={product.name}
          />
        </div>

        <div className="px-4 sm:px-5 pb-4 pt-2 flex flex-col justify-between min-h-[11rem] sm:min-h-[12rem]">
          <div className="flex flex-col flex-grow">
            <p className="text-gray-700 text-xs sm:text-sm capitalize font-semibold group-hover:text-gray-900 transition-colors">
              {product.category}
            </p>
            <p className="text-gray-900 font-semibold text-base sm:text-lg mt-1 group-hover:text-gray-900 transition-colors line-clamp-2">
              {product.name}
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    className="w-4 sm:w-4.5"
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                  />
                ))}
              <span className="text-gray-700 text-xs sm:text-sm font-semibold group-hover:text-gray-900 transition-colors">
                (4)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center mt-3 sm:mt-4 gap-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 max-w-[60%]">
              <p className="text-xl sm:text-2xl font-bold text-primary group-hover:text-primary-dark transition-colors break-words">
                {currency} {product.offerPrice}
              </p>
              <p className="text-gray-400 text-sm sm:text-base line-through break-words">
                {currency} {product.price}
              </p>
            </div>
            <div onClick={(e) => e.stopPropagation()} className="shrink-0">
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-2 bg-primary/10 border border-primary/50 px-3 sm:px-4 py-2 rounded-lg text-primary font-semibold text-sm sm:text-base hover:bg-primary/20 hover:border-primary/70 transition-all duration-300"
                  onClick={() => addToCart(product._id)}
                >
                  <img className="w-4 sm:w-5" src={assets.cart_icon} alt="cart-icon" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-between gap-2 bg-primary/10 border border-primary/50 rounded-lg text-primary font-semibold text-sm sm:text-base w-20 sm:w-24 h-9 sm:h-10">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="px-2 sm:px-3 hover:bg-primary/20 rounded-l-lg h-full transition-all duration-300"
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{cartItems[product._id]}</span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="px-2 sm:px-3 hover:bg-primary/20 rounded-r-lg h-full transition-all duration-300"
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
