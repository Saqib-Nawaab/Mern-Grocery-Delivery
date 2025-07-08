import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function MainBanner() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <img
        src={assets.main_banner_bg}
        alt="Main banner"
        className="w-full h-[450px] lg:h-[550px] object-cover hidden md:block filter brightness-60"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="Main banner mobile"
        className="w-full h-[500px] sm:h-[450px] object-cover md:hidden filter brightness-60"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent z-10" />

      <div className="absolute inset-0 z-20 flex flex-col justify-between items-start px-4 sm:px-6 md:px-16 lg:px-24 py-8 sm:py-10 text-white">
        <div
          className={`mt-10 sm:mt-20 transition-all duration-1000 ease-out ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight drop-shadow-2xl max-w-[700px]">
            Freshness You Can Trust,
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
              Savings You'll Love!
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-100 tracking-tight max-w-[600px]">
            Discover the best deals on daily essentials, delivered fresh and fast.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-12 mb-6 sm:mb-0 transition-all duration-1000 ease-out delay-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm font-semibold shadow-xl hover:scale-105 transform duration-300"
          >
            Shop Now
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              className="w-4 h-4"
            />
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 transition text-gray-900 rounded-full text-sm font-semibold shadow-md hover:scale-105 transform duration-300"
          >
            Explore Deals
            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              className="w-4 h-4"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
