import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-100 py-3 bg-white/90 backdrop-blur-xl sticky top-0 z-30">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900 hidden sm:block">Green Kart</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700">Admin</span>
          </div>
          <button
            onClick={logout}
            className="ios-press border border-gray-200 rounded-xl text-sm px-4 py-2 font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-57px)]">
        {/* Sidebar */}
        <div className="md:w-60 w-16 border-r border-gray-100 bg-gray-50/50 pt-3 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-all duration-200 mx-2 rounded-xl ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-500 hover:bg-gray-100"
                }`
              }
            >
              <img src={item.icon} alt="" className="w-5 h-5" />
              <p className="md:block hidden text-sm">{item.name}</p>
            </NavLink>
          ))}
        </div>

        <div className="flex-1 bg-gray-50/30">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
