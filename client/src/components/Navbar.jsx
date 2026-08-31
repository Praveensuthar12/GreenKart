import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get(`/api/user/logout`);
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      {/* Desktop & Tablet Top Nav */}
      <nav
        className={`hidden sm:flex items-center justify-between px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-3.5 sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "glass ios-shadow-md" : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Green Kart
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "All Products" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center text-sm gap-2 bg-gray-100/80 px-4 py-2.5 rounded-full border border-transparent focus-within:border-primary/30 focus-within:bg-white focus-within:ios-shadow-sm transition-all duration-200 w-64">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 opacity-40"
          />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none placeholder-gray-400 text-sm"
            type="text"
            placeholder="Search products..."
          />
        </div>

        <div className="flex items-center gap-3">
          <div
            onClick={() => {
              if (!user) setShowUserLogin(true);
              else navigate("/cart");
            }}
            className="relative cursor-pointer p-2.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-5 h-5 opacity-70"
            />
            {getCartCount() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 text-[10px] font-bold text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </div>

          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="ios-press cursor-pointer px-6 py-2.5 bg-primary hover:bg-primary-dull transition-colors text-white rounded-full text-sm font-semibold ios-shadow-sm"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
                <img src={assets.profile_icon} className="w-5 h-5" alt="" />
              </div>
              <ul className="hidden group-hover:block absolute top-12 right-0 bg-white/95 backdrop-blur-xl shadow-xl border border-gray-100 py-2 w-44 rounded-2xl text-sm z-50 animate-ios-fade-in">
                <li
                  onClick={() => navigate("my-orders")}
                  className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-gray-700"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  s My Orders
                </li>
                <li className="h-px bg-gray-100 mx-3 my-1" />
                <li
                  onClick={logout}
                  className="px-4 py-2.5 hover:bg-red-50 cursor-pointer flex items-center gap-3 text-red-500"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Top Nav */}
      <nav className="sm:hidden sticky top-0 z-40 glass ios-shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <span className="text-base font-bold text-gray-900">
              Green Kart
            </span>
          </NavLink>

          <div className="flex items-center gap-1">
            <div
              onClick={() => {
                if (!user) setShowUserLogin(true);
                else navigate("/cart");
              }}
              className="relative cursor-pointer p-2 rounded-full"
            >
              <img
                src={assets.nav_cart_icon}
                alt="cart"
                className="w-5 h-5 opacity-70"
              />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 text-[9px] font-bold text-white bg-primary w-4 h-4 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </div>
            {user && (
              <div
                className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => navigate("/my-orders")}
              >
                <img src={assets.profile_icon} className="w-4 h-4" alt="" />
              </div>
            )}
            {!user && (
              <button
                onClick={() => setShowUserLogin(true)}
                className="text-xs font-semibold text-primary px-3 py-1.5 bg-primary/10 rounded-full"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center text-sm gap-2 bg-gray-100 px-3.5 py-2.5 rounded-xl">
            <img
              src={assets.search_icon}
              alt="search"
              className="w-4 h-4 opacity-40"
            />
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder-gray-400 text-sm"
              type="text"
              placeholder="Search products..."
            />
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-gray-200/50 safe-bottom">
        <div className="flex items-center justify-around py-2 px-2">
          {[
            {
              to: "/",
              icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
              label: "Home",
            },
            {
              to: "/products",
              icon: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0",
              label: "Shop",
            },
            {
              to: "/cart",
              icon: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M9 22V12h6v10",
              label: "Cart",
            },
            {
              to: "/my-orders",
              icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
              label: "Orders",
            },
          ].map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === "/"}
              onClick={(e) => {
                if (!user && (tab.to === "/cart" || tab.to === "/my-orders")) {
                  e.preventDefault();
                  setShowUserLogin(true);
                }
              }}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-1 px-4 rounded-xl transition-all duration-200 ${
                  isActive ? "text-primary" : "text-gray-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill={isActive ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={tab.icon} />
                  </svg>
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </>
              )}
            </NavLink>
          ))}
          <button
            onClick={() => {
              if (!user) setShowUserLogin(true);
              else logout();
            }}
            className="flex flex-col items-center gap-0.5 py-1 px-4 text-gray-400"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[10px] font-medium">
              {user ? "Logout" : "Profile"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
