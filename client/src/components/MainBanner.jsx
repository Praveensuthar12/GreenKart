import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative mt-4 sm:mt-6 rounded-3xl overflow-hidden ios-shadow-lg">
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-6 md:pl-16 lg:pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15 text-white drop-shadow-lg">
          Freshness You Can Trust, Savings You will Love!{" "}
        </h1>

        <div className="flex items-center mt-6 font-medium gap-3">
          <Link
            to={"/products"}
            className="ios-press group flex items-center gap-2 px-7 md:px-9 py-3.5 bg-primary hover:bg-primary-dull transition-all rounded-2xl text-white ios-shadow-md"
          >
            Shop Now
            <img
              className="md:hidden transition group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          <Link
            to={"/products"}
            className="ios-press group hidden md:flex items-center gap-2 px-7 py-3.5 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-2xl transition-all hover:bg-white/30"
          >
            Explore deals
            <img
              className="transition group-hover:translate-x-1 w-4"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
