import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-20 rounded-3xl overflow-hidden ios-shadow-lg">
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />

      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-16 lg:pr-24">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow">
            Why We Are the Best?
          </h1>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
