import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";

function SellerLogin() {
  const { setUser, setIsSeller, navigate, isSeller, axios } = useAppContext();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await axios.post("/api/seller/login", { email, password });

      if (data.success) {
        setUser({ email, role: "seller" });
        setIsSeller(true);
        toast.success("Logged in as Seller");
        navigate("/seller");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  return (
    !isSeller && (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
          <div className="text-center mb-6">
            <img
              src={assets.logo}
              alt="Seller Logo"
              className="w-14 mx-auto mb-2"
            />
            <h2 className="text-3xl font-extrabold text-gray-800">
              Seller Login
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Access your seller account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seller@example.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-primary"
                >
                  {showPassword ? "🔓" : "🔒"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dull hover:shadow-lg"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login as Seller"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Want to go back?{" "}
            <span
              className="text-primary cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Return Home
            </span>
          </p>
        </div>
      </div>
    )
  );
}

export default SellerLogin;
