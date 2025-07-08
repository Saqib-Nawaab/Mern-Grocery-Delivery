import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartArray, setCartArray] = useState([]);
  const [paymentOption, setPaymentOption] = useState("COD");

  const addressDropdownRef = useRef(null); 

  const {
    products,
    currency,
    cartItems,
    setCartItems,
    removeFromCart,
    getCartTotal,
    getCartCount,
    navigate,
    updateCartItem,
    axios,
    user,
  } = useAppContext();

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        toast.error("Please select an address");
        return;
      }

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Payment option not selected");

        // const { data } = await axios.post("/api/order/stripe", {
        //   userId: user._id,
        //   items: cartArray.map((item) => ({
        //     product: item._id,
        //     quantity: item.quantity,
        //   })),
        //   address: selectedAddress._id,
        // });
        // if (data.success) {
        //   toast.success(data.message);
        //   window.location.href = data.url;
        // } else {
        //   setCartItems({});
        //   navigate("/my-orders");
        // }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/list");
      if (data.success) {
        setAddress(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCart = () => {
    const tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(tempArray);
  };

  useEffect(() => {
    if (cartItems && products.length > 0) {
      getCart();
    }
  }, [cartItems, products]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addressDropdownRef.current &&
        !addressDropdownRef.current.contains(event.target)
      ) {
        setShowAddress(false);
      }
    };

    if (showAddress) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddress]);

  return cartItems && products.length > 0 ? (
    <div className="flex flex-col md:flex-row mt-16">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{getCartCount()}</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-3 text-gray-700"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div className="w-24 h-24 flex items-center justify-center border border-gray-300 rounded cursor-pointer">
                <img
                  onClick={() => {
                    navigate(
                      `/products/${product.category.toLowerCase()}/${
                        product._id
                      }`
                    );
                    scrollTo(0, 0);
                  }}
                  className="max-w-full h-full object-cover"
                  src={product.images[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p>Qty:</p>
                    <select
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                      className="outline-none border px-2 py-1 rounded"
                    >
                      {Array.from(
                        { length: Math.max(cartItems[product._id], 9) },
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="Remove"
                className="w-6 h-6 inline-block cursor-pointer hover:w-7 hover:h-7"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img
            className="group-hover:translate-x-1 transition"
            src={assets.arrow_right_icon_colored}
            alt=""
          />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70 rounded">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500 text-sm">
              {selectedAddress
                ? `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : `No address selected`}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline text-sm"
            >
              Change
            </button>

            {showAddress && (
              <div
                ref={addressDropdownRef} 
                className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded shadow-md z-10 text-sm"
              >
                {address.map((addr, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setShowAddress(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    {addr.address}, {addr.city}, {addr.state}, {addr.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-indigo-50"
                >
                  + Add New Address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 mt-2 bg-white rounded outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-600 mt-4 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartTotal()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartTotal() * 0.02).toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between font-semibold text-base mt-3">
            <span>Total</span>
            <span>
              {currency}
              {(getCartTotal() * 1.02).toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-primary text-white font-medium hover:bg-primary-dull transition rounded"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed To Check Out"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
