import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { setIsSeller, axios, navigate } = useAppContext();

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
      const { data } = await axios.post("/api/seller/logout");
      if (data.success) {
        setIsSeller(false); 
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      setIsSeller(false); 
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img
            className="cursor-pointer w-28 md:w-32"
            src={assets.logo}
            alt="Seller Logo"
          />
        </Link>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <p>Hi! Seller</p>
          <button
            onClick={logout}
            className="border border-primary text-primary px-4 py-1 rounded-full hover:bg-primary hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-56px)]">
        <div className="md:w-64 w-16 border-r border-gray-200 bg-white pt-4">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 transition-all duration-200 ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] border-primary bg-primary/10 text-primary"
                    : "hover:bg-gray-50 text-gray-700"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <span className="md:block hidden">{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="flex-1 bg-gray-50 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
