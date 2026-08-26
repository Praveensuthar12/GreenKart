import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate, cartItems } = useAppContext();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        setUser(data.user);
        setShowUserLogin(false);
        if (Object.keys(cartItems).length > 0) {
          navigate("/cart");
        } else {
          navigate("/");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-ios-fade-in"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 glass-dark" />

      {/* iOS Sheet */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:w-[380px] bg-white sm:rounded-3xl rounded-t-3xl animate-ios-slide-up sm:animate-ios-scale-in ios-shadow-xl overflow-hidden"
      >
        {/* Handle bar (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-9 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="px-6 pt-4 pb-8 sm:px-8 sm:pt-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {state === "login" ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {state === "login"
                  ? "Sign in to continue shopping"
                  : "Join Green Kart today"}
              </p>
            </div>
            <button
              onClick={() => setShowUserLogin(false)}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-4">
            {state === "register" && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 mt-1.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                  type="text"
                  required
                />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="you@example.com"
                className="w-full px-4 py-3 mt-1.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                type="email"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter your password"
                className="w-full px-4 py-3 mt-1.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                type="password"
                required
              />
            </div>

            <button
              type="submit"
              className="ios-press w-full py-3.5 bg-primary hover:bg-primary-dull transition-all text-white rounded-2xl font-semibold text-sm ios-shadow-sm"
            >
              {state === "register" ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm text-gray-400">
              {state === "register" ? (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setState("login")}
                    className="text-primary font-semibold cursor-pointer"
                  >
                    Sign In
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span
                    onClick={() => setState("register")}
                    className="text-primary font-semibold cursor-pointer"
                  >
                    Sign Up
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
