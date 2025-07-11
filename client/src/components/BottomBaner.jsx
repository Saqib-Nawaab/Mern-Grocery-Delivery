import React from "react";
import { assets, features } from "../assets/assets";

function BottomBaner() {
  return (
    <div className="relative mt-24">
      <img
        src={assets.bottom_banner_image}
        alt="Banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="Banner"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24 z-10">
        <div className="max-w-xl text-center md:text-right">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-primary">
            Why We Are The Best?
          </h1>

          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 mt-2">
              <img
                src={feature.icon}
                className="md:w-11 w-9"
                alt={feature.title}
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomBaner;
