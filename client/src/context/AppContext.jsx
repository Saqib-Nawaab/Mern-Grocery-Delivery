import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success && data.user) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch (error) {
      if (error?.response?.status !== 401) {
        console.error(
          "User fetch error:",
          error?.response?.data || error.message
        );
        toast.error("Something went wrong fetching user.");
      }
      setUser(null);
      setCartItems({});
    }
  };

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success && !!data.seller);
    } catch (error) {
      if (error?.response?.status !== 401) {
        console.error(
          "Seller fetch error:",
          error?.response?.data || error.message
        );
        toast.error("Something went wrong fetching seller.");
      }
      setIsSeller(false);
    }
  };

  const getCartCount = () => {
    let total = 0;
    for (let qty of Object.values(cartItems)) {
      total += qty;
    }
    return total;
  };

  const getCartTotal = () => {
    return (
      Math.floor(
        Object.entries(cartItems).reduce((total, [id, qty]) => {
          const product = products.find((p) => p._id === id);
          return product ? total + product.offerPrice * qty : total;
        }, 0) * 100
      ) / 100
    );
  };

  const addToCart = (itemId) => {
    const cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const removeFromCart = (itemId) => {
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
      setCartItems(cartData);
      toast.success("Removed from Cart");
    }
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = { ...cartItems };
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
        if (data.message) toast.success(data.message);
      } else {
        if (data.message) toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchUser();

      fetchSeller();
    
    fetchProduct();
  }, []);

  useEffect(() => {
    const updateCart = async () => {
      if (!user || Object.keys(cartItems).length === 0) return;

      try {
        const { data } = await axios.post("/api/cart/update", {
          cartItems,
        });
        if (!data.success) toast.error(data.message);
      } catch (error) {
        console.error("Cart Update Error:", error);
        toast.error("Failed to update cart");
      }
    };

    updateCart();
  }, [cartItems]);

  const value = {
    navigate,
    addToCart,
    fetchUser,
    currency,
    setSearchQuery,
    searchQuery,
    user,
    setCartItems,
    isSeller,
    removeFromCart,
    setIsSeller,
    setUser,
    showUserLogin,
    products,
    setshowUserLogin,
    updateCartItem,
    cartItems,
    getCartCount,
    getCartTotal,
    axios,
    fetchProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
