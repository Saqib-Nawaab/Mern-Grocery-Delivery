import React, { useContext, useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    navigate,
    user,
    isSeller,
    setIsSeller,
    axios,
    setUser,
    setshowUserLogin,
    setSearchQuery,
    searchQuery,
    getCartCount,
  } = useContext(AppContext);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        setIsSeller(null);
        setshowUserLogin(null);
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-50">
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 shadow-sm bg-white">
        <NavLink to="/" onClick={() => setOpen(false)}>
          <img
            className="h-10 transition-transform duration-300 hover:scale-105"
            src={assets.logo}
            alt="logo"
          />
        </NavLink>

        <div className="hidden sm:flex items-center gap-8">
          <NavLink className="hover:text-primary transition" to="/">
            Home
          </NavLink>
          <NavLink className="hover:text-primary transition" to="/products">
            All Products
          </NavLink>
          <NavLink className="hover:text-primary transition" to="/contact">
            Contact
          </NavLink>

          <div className="hidden lg:flex items-center border border-gray-300 rounded-full px-3 py-1.5 bg-gray-50 hover:border-2 hover:border-primary">
            <input
              className="bg-transparent outline-none text-sm placeholder-gray-500 w-40 "
              type="text"
              placeholder="Search products"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img
              src={assets.search_icon}
              alt="search"
              className="h-4 w-4 ml-2 "
            />
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img
              src={assets.cart_icon}
              alt="cart"
              className="h-6 w-6 transition-transform duration-200 hover:scale-125 hover:drop-shadow-md"
            />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>

          {!user ? (
            <button
              onClick={() => setshowUserLogin(true)}
              className="px-6 py-2 bg-primary hover:bg-primary-dull text-white rounded-full text-sm transition"
            >
              Login
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                src={assets.profile_icon}
                className="h-8 w-8 rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition"
                alt="profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <ul className="absolute right-0 top-10 w-40 bg-white border border-gray-200 rounded-lg shadow-lg text-sm z-50">
                  <li>
                    <NavLink
                      to="/my-orders"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Orders
                    </NavLink>
                  </li>
                  {isSeller && (
                    <li>
                      <NavLink
                        to="/seller"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Products
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="sm:hidden flex items-center gap-4">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img src={assets.cart_icon} alt="cart" className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            <img src={assets.menu_icon} alt="menu" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md z-50 py-6 px-6 text-sm flex flex-col gap-4 sm:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            Products
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}
          {user && isSeller && (
            <NavLink to="/my-products" onClick={() => setOpen(false)}>
              My Products
            </NavLink>
          )}
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setshowUserLogin(true);
              }}
              className="px-6 py-2 bg-primary hover:bg-primary-dull text-white rounded-full text-sm transition"
            >
              Log In
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="px-6 py-2 bg-primary hover:bg-primary-dull text-white rounded-full text-sm transition"
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
