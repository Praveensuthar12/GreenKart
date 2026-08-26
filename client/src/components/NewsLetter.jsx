import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 pb-16">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Never Miss a Deal!</h1>
      <p className="text-sm md:text-base text-gray-400 mb-8 max-w-md">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>
      <form className="flex items-center gap-3 max-w-lg w-full">
        <input
          className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl h-12 outline-none px-5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder-gray-400"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="ios-press h-12 px-8 text-white bg-primary hover:bg-primary-dull transition-all rounded-2xl font-semibold text-sm ios-shadow-sm whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
